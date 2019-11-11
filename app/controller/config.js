'use strict';
const fs = require('fs');
const file = 'sql/sqlconfig.json';
const Controller = require('egg').Controller;

class ConfigController extends Controller {
  async post() {
    // const { ctx } = this;
    if (this.ctx.request.body.poolname !== undefined && this.ctx.request.body.poolname !== '') {
      let config = JSON.parse(JSON.stringify(this.app.pgsql.config));
      config[this.ctx.request.body.poolname] = {
        user: this.ctx.request.body.user,
        password: this.ctx.request.body.password,
        host: this.ctx.request.body.host,
        database: this.ctx.request.body.database,
        port: this.ctx.request.body.port,
      };
      //console.log(this.app.pgsql.config);
      await fs.writeFileSync(file, JSON.stringify(config));
      this.ctx.body = { message: '配置写入成功' };
      this.ctx.status = 200;
    } else {
      this.ctx.body = { message: '请好好写一下配置' };
      this.ctx.status = 500;
    }
    // user,password,host,database,port
  }
  async put() {
    if (this.ctx.request.body.poolname !== undefined && this.ctx.request.body.poolname !== '') {
      let config = JSON.parse(JSON.stringify(this.app.pgsql.config));
      for (let key in this.ctx.request.body) {
        if (key !== "poolname") {
          config[this.ctx.request.body.poolname][key] = this.ctx.request.body[key]
        }
      }
      await fs.writeFileSync(file, JSON.stringify(config));
      this.ctx.body = { message: '配置写入成功', config: config };
      this.ctx.status = 200;
    } else {
      this.ctx.body = { message: '请好好写一下配置' };
      this.ctx.status = 403;
    }
  }
  async delete() {
    if (this.ctx.request.body.poolname !== undefined && this.ctx.request.body.poolname !== '') {
      let config = JSON.parse(JSON.stringify(this.app.pgsql.config));
      delete config[this.ctx.request.body.poolname]
      await fs.writeFileSync(file, JSON.stringify(config));
      this.ctx.body = { message: '配置写入成功' };
      this.ctx.status = 200;
    } else {
      this.ctx.body = { message: '请好好写一下配置' };
      this.ctx.status = 403;
    }
  }
}

module.exports = ConfigController;
