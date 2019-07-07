import { Container } from 'inversify';
import { Logger } from 'winston';
import { TYPES } from './util/ioc-types';
import createLogger from './util/logger';
import createCache from './util/cache';
import './controller/test-controller';

export default async function(): Promise<Container> {
  const container = new Container({ autoBindInjectable: true });
  const logger = createLogger();
  container.bind<Logger>(TYPES.Logger).toConstantValue(logger);

  const cache = createCache();
  container.bind(TYPES.Cache).toConstantValue(cache);
  return container;
}
