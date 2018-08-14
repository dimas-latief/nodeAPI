/**
 * In here we will try to config, with the NODE_ENV=parameter
 */

// declaring the environment container as an object
var environment = {};

// declare the staging environment
environment.staging = {
    'port' : 3000,
    'envName' : 'staging'
}

environment.production = {
    'port' : 5000,
    'envName' : 'production'
}

// handler for the environment
var choosenEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

var environmentToExport = typeof(environments[choosenEnvironment]) == 'object' ? environments[choosenEnvironment] : environment.staging;

module.exports = environmentToExport;