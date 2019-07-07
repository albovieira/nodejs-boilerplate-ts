import { Cache } from 'cache-layer';

const { CACHE_TTL }  = process.env;

function createCache() {
  const cache = Cache.create({
    provider: 'in-memory',
    ttl: CACHE_TTL,
  });
  return cache;
}

export default createCache;
