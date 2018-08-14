/**
 * we want to use CLI in here
 * 
 */

//  Dependencies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};

var e = new _events();
// this is the recomended way 

// we just instantiate e, so we can do a lot of things with this

// 