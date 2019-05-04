import 'mocha';

import { Container } from 'inversify';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import chaiAsPromised = require('chai-as-promised');
import * as moment from 'moment';
import bootstrap from '../lib/bootstrap';

chai.use(chaiAsPromised);

describe('MovieDB', () => {
  it('Deve criar uma intenção de busca', async () => {
    nock()
      .get('/airports/stretch/CNF/GRU')
      .reply(HttpStatus.OK, {
        route: {
          from: { iata: 'CNF', country: 'BR' },
          to: { iata: 'GRU', country: 'BR' },
          international: false,
          mercosul: false,
          airlines: ['azul'],
        },
      });
  });
});
