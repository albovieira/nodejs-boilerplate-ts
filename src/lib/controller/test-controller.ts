import {
  interfaces,
  controller,
  httpPost,
  requestBody,
  httpGet,
  requestParam,
  queryParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Logger } from 'winston';
import { IntentionService } from '../service/intention-service';
import { SearchParams, Projection } from '../model';
import { NotFoundError, InvalidSearchParams } from '../util/errors';
import IntentionValidator from '../validators/intention-validator';
import { TYPES } from '../util/ioc-types';

@controller('/search-intention')
export class TestController implements interfaces.Controller {
  @httpGet('/')
  async test() {
    return {
      working: true,
    };
  }
}
