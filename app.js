'use strict';
const fs = require('fs');
const file = 'sql/sqlconfig.json';
const { Pool } = require('pg');

class AppBootHook {

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // this.app.logger.info("didload")// 请将你的插件项目中 app.beforeStart 中的代码置于此处。
    const result = JSON.parse(fs.readFileSync(file));
    this.app.pg = {};
    this.app.pgsql = {};
    this.app.pgsql.config = result;
    for (const key in result) {
      if (result[key].database !== undefined) {
        this.app.pg[key] = new Pool(result[key]);
        this.app.logger.info(`[connect] 数据库${result[key].host} ${result[key].database}配置成功`);
        // console.log(this.app.pg.dev)
      }
      // console.log(result[key])
    }
  }
  async beforeClose() {
    //this.app.logger.info('beforeClose');
  }
  async willReady() {
    //this.app.logger.info('willReady');
  }
}

module.exports = AppBootHook;
