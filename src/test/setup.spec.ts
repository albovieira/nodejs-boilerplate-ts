import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { TYPES } from '../lib/util/ioc-types';
import { Collection } from 'mongodb';

dotenv.config({ path: './.env.test' });

import bootstrap from '../lib/bootstrap';
import { RedisClient } from 'redis';

before(async () => {
  // const container = await bootstrap();
});
