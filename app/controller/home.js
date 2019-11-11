'use strict';
// fs.writeFileSync(file,JSON.stringify(dev))

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    this.ctx.body = this.app.pgsql.config;
    this.ctx.status = 200;
  }
}

module.exports = HomeController;
