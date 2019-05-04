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
import { MovieDB } from '../service/moviedb';

@controller('/movies')
export class MoviesController implements interfaces.Controller {

  constructor(
    private movieDB: MovieDB,
  ) {}

  @httpGet('/upcoming')
  async upcoming(@queryParam('language') language: string, @queryParam('page') page: number) {
    return this.movieDB.getUpComing({ language, page });
  }
}
