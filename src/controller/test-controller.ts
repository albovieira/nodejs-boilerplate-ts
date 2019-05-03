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

@controller('/search-intention')
export class TestController implements interfaces.Controller {
  @httpGet('/')
  async test() {
    return {
      working: true,
    };
  }
}
