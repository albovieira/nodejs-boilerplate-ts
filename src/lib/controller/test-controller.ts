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

@controller('/test')
export class TestController implements interfaces.Controller {
  @httpGet('/')
  async test() {
    return {
      working: true,
    };
  }
}
