var koa = require('koa');
var router = require('koa-router')();
var data = require('./user-data.js');

var app = module.exports = koa();

router.get('/user', function *(next) {
  this.body = yield data.users.get();
});

app
  .use(router.routes())
  .use(router.allowedMethods());
