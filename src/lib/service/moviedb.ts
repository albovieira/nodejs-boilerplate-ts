import { injectable, inject } from 'inversify';
import * as request from 'superagent';
import { TYPES } from '../util/ioc-types';
import { ServiceConfig, QueryRequest, ResponseMoviesUpcoming, ResponseMovieDetails, Languages } from '../model';
import Cache from '../util/cache';

@injectable()
export class MovieDB {
  constructor(
    @inject(TYPES.TheMovieDBConfig)
    private movieDBConfig: ServiceConfig,
    @inject(TYPES.Cache)
    private cache: Cache,
  ) {}

  async getUpComing(options: QueryRequest){
    options.language = options.language || Languages.ENG_US;
    const hashkey = this.createHashKey(options.page, options.language);
    if(this.cache.hasKey(hashkey)){
      const cacheValue = await this.cache.getItem(hashkey);
      return <ResponseMoviesUpcoming>cacheValue;
    }
    const response = await request
    .get(`${this.movieDBConfig.url}/movie/upcoming`)
    .query({ api_key: this.movieDBConfig.token })
    .query({ language: options.language })
    .query({ page: options.page });

    this.cache.save(hashkey, response.body);
    return <ResponseMoviesUpcoming>response.body;
  }

  async getMovieDetails(id:string, options: QueryRequest){
    options.language = options.language || Languages.ENG_US;
    const response = await request
    .get(`${this.movieDBConfig.url}/movie/${id}`)
    .query({ api_key: this.movieDBConfig.token })
    .query({ language: options.language });

    return <ResponseMovieDetails>response.body;
  }

  private createHashKey(page: number, language: string){
    return `${page}-${language}-movie/upcoming`;
  }
}
