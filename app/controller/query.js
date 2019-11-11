'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async query() {
    this.app.logger.info(`[query]  db : ${this.ctx.params.database} { ${this.ctx.query.sql}}`);
    if (this.ctx.query.sql != "" && this.ctx.query.sql != undefined) {
      await this.app.pg[this.ctx.params.database].query(this.ctx.query.sql)//'SELECT NOW()'
        .then(res => {
          this.ctx.body = res;
          this.ctx.status = 200;
        },
          err => {
            this.ctx.body = err;
            this.ctx.status = 500;
          })
    } else {
      let context = {}
      context.message = "参数不能为空";
      context.code = 403;
      this.ctx.body = context;
      this.ctx.status = 403;
      //this.ctx.status =200
      //ctx.body = "boom";
      //这个api乱搞是要炸上天的
    }
  }
}

module.exports = HomeController;