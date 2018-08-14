// Set environment container
// Handler to choose which environment
// Set default environment

/**
 * Create environment
 */

var environments = {};

environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
}

environments.production = {
    'port' : 5000,
    'envName' : 'production'
}

// Environment setter
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

// Environment handler / set default environments
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport

// on the index.js import this
// var config = require('./config');