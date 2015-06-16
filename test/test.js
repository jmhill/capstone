var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

// global.environment = 'test';  <--- Change this to reflect testing config
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);