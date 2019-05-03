import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

import bootstrap from '../src/bootstrap';

before(async () => {
  // const container = await bootstrap();
});
