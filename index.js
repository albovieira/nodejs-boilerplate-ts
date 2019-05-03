if (process.env.NODE_ENV === 'production') {
   require('newrelic');
}

require('./bin/index.js');
