import {
  interfaces,
  controller,
  httpGet,
} from 'inversify-express-utils';

@controller('/test')
export class TestController implements interfaces.Controller {
  @httpGet('/')
  async test() {
    return {
      working: true,
    };
  }
}
