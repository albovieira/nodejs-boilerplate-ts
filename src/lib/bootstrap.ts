import { Container } from 'inversify';
import { MongoClient, Collection, Db } from 'mongodb';
import * as Redis from 'ioredis';
import * as winston from 'winston';

import { TYPES } from './util/ioc-types';

import './controller/movies-controller';
import { DatabaseError } from './util/errors';
import { ServiceConfig } from './model';

const DECIMAL_RADIX = 10;
const { MDB_BASE_URI , MDB_TOKEN, MDB_TIMEOUT, MONGO_URL, MONGO_DATABASE } = process.env;

const REDIS_HOST = process.env.REDIS_HOST!;
const REDIS_PORT = Number.parseInt(process.env.REDIS_PORT!, DECIMAL_RADIX);
const REDIS_DB = Number.parseInt(process.env.REDIS_DB! || '0', DECIMAL_RADIX);

const AIRPORTS_PROVIDER_BASE_URI = process.env.AIRPORTS_PROVIDER_BASE_URI!;
const AIRPORTS_PROVIDER_TIMEOUT = Number.parseInt(
  process.env.AIRPORTS_PROVIDER_TIMEOUT! || '60000',
  DECIMAL_RADIX,
);

function getMDBConfig(): ServiceConfig {
  return {
    url: MDB_BASE_URI || '',
    token: MDB_TOKEN || '',
    timeout: MDB_TIMEOUT || '',
  };
}

export default async function(): Promise<Container> {
  const container = new Container({ autoBindInjectable: true });

  // const logger = createLogger();
  // container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

  const redisClient = new Redis(REDIS_PORT, REDIS_HOST, {
    db: REDIS_DB || 0,
    keyPrefix: 'mdb:',
    lazyConnect: true,
    maxRetriesPerRequest: 0,
  });

  container.bind(TYPES.RedisClient).toConstantValue(redisClient);

  container
    .bind(TYPES.CacheTtl)
    .toConstantValue(
      Number.parseInt(process.env.CACHE_TTL! || '60', DECIMAL_RADIX),
    );

  container
    .bind(TYPES.TheMovieDBConfig)
    .toConstantValue(getMDBConfig());

  return container;
}
