'use strict';
const fs = require('fs');
const file = 'sql/sqlconfig.json';
const Subscription = require('egg').Subscription;
const { Pool } = require('pg');
const lo = require('lodash');
class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s', // 5秒间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    for (const key3 in this.app.pg) {
      // console.log(this.app.pg[key1])
      await this.app.pg[key3].query('SELECT NOW()')//'SELECT NOW()'
        .then(res => {
          //this.app.logger.info("[health] "+key3+" : "+JSON.stringify(res.rows[0]));
        },
          err => {
            this.app.logger.error("[error] " + err);
          }
        )
      // this.app.logger.info(key3)
    }
    const result = JSON.parse(fs.readFileSync(file));
    // console.log(lo.isEqual(result, this.app.pgsql.config))
    if (!lo.isEqual(result, this.app.pgsql.config)) {
      this.app.logger.info('读取到配置变更，正在重新链接数据库');
      for (const key1 in this.app.pg) {
        // console.log(this.app.pg[key1])
        this.app.pg[key1] = {};
      }
      this.app.pgsql.config = result;
      for (const key2 in this.app.pgsql.config) {
        if (this.app.pgsql.config[key2].database !== undefined) {
          this.app.pg[key2] = new Pool(this.app.pgsql.config[key2]);
          this.app.logger.info(`数据库${this.app.pgsql.config[key2].host} ${this.app.pgsql.config[key2].database}配置成功`);
          // console.log(this.app.pg.dev)
        }
        // console.log(result[key])
      }
    }
    // this.app.logger.info(result)

  }

  async health_check() {

  }
}

module.exports = UpdateCache;
