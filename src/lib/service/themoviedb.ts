import { injectable, inject } from 'inversify';
import * as request from 'superagent';
import { TYPES } from '../util/ioc-types';
import { ServiceConfig, QueryRequest } from '../model';

@injectable()
export class TheMovieDB {
  private client:any;
  constructor(
    @inject(TYPES.TheMovieDBConfig)
    private movieDBConfig: ServiceConfig,
  ) {}

  getUpComing(options: QueryRequest){
    return request
    .get(`${this.movieDBConfig.url}/movie/upcoming`)
    .query({ api_key: this.movieDBConfig.token })
    .query({ language: options.language })
    .query({ page: options.page });
  }

}
