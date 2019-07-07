import { Container } from 'inversify';
import { MongoClient, Collection, Db } from 'mongodb';
import * as Redis from 'ioredis';
import * as winston from 'winston';
import { ConfigProvider, LoggerFactory, LoggerTypes } from 'cache-layer';

import { TYPES } from './util/ioc-types';

import './controller/test-controller';
import { DatabaseError } from './util/errors';

const DECIMAL_RADIX = 10;
const MONGO_URL = process.env.MONGO_URL!;
const MONGO_DATABASE = process.env.MONGO_DATABASE!;
const REDIS_HOST = process.env.REDIS_HOST!;
const REDIS_PORT = Number.parseInt(process.env.REDIS_PORT!, DECIMAL_RADIX);
const REDIS_DB = Number.parseInt(process.env.REDIS_DB! || '0', DECIMAL_RADIX);

function createLogger(): winston.Logger {
  const {
    ENVIRONMENT,
    REDIS_LOG_HOST,
    REDIS_LOG_CONTAINER,
    REDIS_LOG_ENABLE,
    REDIS_LOG_LEVEL,
  } = process.env;

  const logProviders: ConfigProvider[] = [
    {
      name: LoggerTypes.REDIS,
      enabled: REDIS_LOG_ENABLE === 'true',
      config: {
        level: REDIS_LOG_LEVEL,
        host: REDIS_LOG_HOST,
        port: REDIS_PORT,
        container: REDIS_LOG_CONTAINER,
        logstash: true,
        useNumericLevel: true,
        fixed: { '@source': ENVIRONMENT },
      },
    },
  ];

  const consoleProvider: ConfigProvider = {
    name: LoggerTypes.CONSOLE,
    enabled: true,
    config: {
      level: REDIS_LOG_LEVEL,
    },
  };
  const provider: ConfigProvider = logProviders.find(p => p.enabled) || consoleProvider;

  const logger = LoggerFactory.create(provider.name, provider.config || {});
  return logger;
}

let database: Db;

async function getMongoCollection(collectionName: string): Promise<Collection> {
  try {
    if (!database) {
      const client = await MongoClient.connect(MONGO_URL, {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
      });

      database = client.db(MONGO_DATABASE);
    }

    return database.collection(collectionName);
  } catch (err) {
    throw new DatabaseError(err, 'Database connection error');
  }
}

export default async function(): Promise<Container> {
  const logger = createLogger();

  const container = new Container({ autoBindInjectable: true });

  container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

  // const myCollection = await getMongoCollection('intentions');

  // container
  //   .bind(TYPES.IntentionCollection)
  //   .toConstantValue(myCollection);
  // container.bind(TYPES.ChannelCollection).toConstantValue(channelCollection);

  const redisClient = new Redis(REDIS_PORT, REDIS_HOST, {
    db: REDIS_DB || 0,
    keyPrefix: 'key_index:',
    lazyConnect: true,
    maxRetriesPerRequest: 0,
  });

  container.bind(TYPES.RedisClient).toConstantValue(redisClient);

  // Validators

  container
    .bind(TYPES.CacheTtl)
    .toConstantValue(
      Number.parseInt(process.env.CACHE_TTL! || '60', DECIMAL_RADIX),
    );

  // container
  //   .bind(TYPES.AirportsProviderConfig)
  //   .toConstantValue(getAirportsProviderConfig());

  return container;
}
