export interface ServiceConfig {
  url: string;
  token: string;
  timeout: string;
}

export interface QueryRequest {
  page: number | 1;
  language: string;
}
