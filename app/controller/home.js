'use strict';
// fs.writeFileSync(file,JSON.stringify(dev))

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    this.ctx.body = "<p>启动成功</p>";
    this.ctx.status = 200;
  }
}

module.exports = HomeController;
