import 'mocha';

import { Container } from 'inversify';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as nock from 'nock';
import 'chai-http';
import chaiAsPromised = require('chai-as-promised');
import * as moment from 'moment';
import createApp from '../lib/app';
import bootstrap from '../lib/bootstrap';
import { ServiceConfig } from '../lib/model';
import { TYPES } from '../lib/util/ioc-types';

chai.use(chaiAsPromised);
chai.use(require('chai-http'));

describe('MovieDB', () => {
  let movieConfig: ServiceConfig;

  before(async () => {
    const container = await bootstrap();
    movieConfig = container.get(TYPES.TheMovieDBConfig);
  });

  it('should get upcoming movies', async () => {
    nock(movieConfig.url)
      .get('/movie/upcoming')
      .reply(200, {
        done: true,
      });

    const container = await bootstrap();
    const app = await createApp(container);
    const { status, body } = await chai
      .request(app)
      .get('/movies/')
      .query({ page: 1 });
    expect(status).to.be.eq(200);
  });
});
