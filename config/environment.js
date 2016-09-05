/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'shifty',
    environment: environment,
    baseURL: '/',
    defaultLocationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cordova: {
      rebuildOnChange: false,
      emulate: false
    }
  };
  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-inline'",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self'",
    'img-src': "'self' data:",
    'media-src': "'self'"
  };
  
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  	ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
  		serverTokenEndpoint: 'http://52.89.48.249:3002/auth'
    };
    minifyCSS: {
      enabled: true
    }
    minifyJS: {
      enabled: true
    }
  }else{
  	ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:3002/auth'
    };
  }

  return ENV;
};
