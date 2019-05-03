import { injectable, inject } from 'inversify';
import * as request from 'superagent';
import { TYPES } from '../util/ioc-types';
import { ServiceConfig, QueryRequest, ResponseMoviesUpcoming, ResponseMovieDetails } from '../model';

@injectable()
export class MovieDB {
  constructor(
    @inject(TYPES.TheMovieDBConfig)
    private movieDBConfig: ServiceConfig,
  ) {}

  async getUpComing(options: QueryRequest){
    const response = await request
    .get(`${this.movieDBConfig.url}/movie/upcoming`)
    .query({ api_key: this.movieDBConfig.token })
    .query({ language: options.language })
    .query({ page: options.page });

    return <ResponseMoviesUpcoming>response.body;
  }

  async getMovieDetails(id:string, options: QueryRequest){
    const response = await request
    .get(`${this.movieDBConfig.url}/movie/${id}`)
    .query({ api_key: this.movieDBConfig.token })
    .query({ language: options.language });

    return <ResponseMovieDetails>response.body;
  }
}
