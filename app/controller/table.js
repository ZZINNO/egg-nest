'use strict';

const Controller = require('egg').Controller;

class TableController extends Controller {
    //?where=field$=.value
    async get() {
        if (this.ctx.params.schema != '' && this.ctx.params.table != '') {
            let boom = `SELECT * FROM ${this.ctx.params.schema}.${this.ctx.params.table}`;
            if (this.ctx.query.aggregate != undefined) {
                boom = `SELECT ${this.ctx.query.aggregate} FROM ${this.ctx.params.schema}.${this.ctx.params.table}`;
            }
            if (this.ctx.query.where != undefined) {
                let field = this.ctx.query.where.split("$")
                let value = field[1].split(".")
                boom = `${boom} where ${field[0]} ${value[0]} ${value[1]}`
            }
            if (this.ctx.query.orderby != undefined){
                boom = `${boom} order by ${this.ctx.query.orderby}`
            }
            if (this.ctx.query.limit != undefined){
                boom = `${boom} limit ${this.ctx.query.limit}`
            }
            if (this.ctx.query.offset != undefined){
                boom = `${boom} offset ${this.ctx.query.offset}`
            }
            this.app.logger.info(boom)
            await this.app.pg[this.ctx.params.database].query(boom)
                .then(res => {
                    this.ctx.body = res.rows;
                    this.ctx.status = 200;
                },
                    err => {
                        this.ctx.body = err;
                        this.ctx.status = 500;
                    });
        } else {
            let context = {}
            context.message = "参数不能为空";
            context.code = 403;
            this.ctx.body = context;
            this.ctx.status = 403;
        };
    };
    async post() {
        if (this.ctx.params.schema != '' && this.ctx.params.table != '') {
            let columns = ""
            let values = ""
            // console.log(this.ctx.request.body)
            // for (let keys in this.ctx.request){
            //     console.log(this.ctx.request.toJSON())
            // }
            for (let key in this.ctx.request.body) {
                columns = `${columns} ${key},`
                values = `${values} '${this.ctx.request.body[key]}',`
            }
            columns = columns.substr(0, columns.length - 1);
            values = values.substr(0, values.length - 1);
            let boom = `INSERT INTO ${this.ctx.params.schema}.${this.ctx.params.table} (${columns}) VALUES (${values})`;
            this.app.logger.info(boom)
            await this.app.pg[this.ctx.params.database].query(boom)
                .then(res => {
                    this.ctx.body = res;
                    this.ctx.status = 200;
                },
                    err => {
                        this.ctx.body = err;
                        this.ctx.status = 500;
                    });
        } else {
            let context = {}
            context.message = "参数不能为空";
            context.code = 403;
            this.ctx.body = context;
            this.ctx.status = 403;
        };
    };

    // 方法put应该可以用了
    async put() {
        if (this.ctx.params.schema != '' && this.ctx.params.table != '') {
            if (this.ctx.request.body.set != undefined && this.ctx.request.body.where != undefined) {
                //let boom = `UPDATE COMPANY SET SALARY = 15000 WHERE ID = 3`;
                let set_field = this.ctx.request.body.set.split("$")
                let set_value = set_field[1].split(".")
                let where_field = this.ctx.request.body.where.split("$")
                let where_value = where_field[1].split(".")
                let boom = `UPDATE ${this.ctx.params.schema}.${this.ctx.params.table} SET ${set_field[0]} ${set_value[0]} ${set_value[1]} WHERE ${where_field[0]} ${where_value[0]} ${where_value[1]}`
                this.app.logger.info(boom)
                await this.app.pg[this.ctx.params.database].query(boom)
                    .then(res => {
                        this.ctx.body = res;
                        this.ctx.status = 200;
                    },
                        err => {
                            this.ctx.body = err;
                            this.ctx.status = 500;
                        });
            } else {
                let context = {}
                context.message = "set和where参数不能为空";
                context.code = 403;
                this.ctx.body = context;
                this.ctx.status = 403;
            }
        } else {
            let context = {}
            context.message = "参数不能为空";
            context.code = 403;
            this.ctx.body = context;
            this.ctx.status = 403;
        };
    };
    async delete() {
        if (this.ctx.params.schema != '' && this.ctx.params.table != '') {
            //let boom = `SELECT * FROM ${this.ctx.params.schema}.${this.ctx.params.table}`;
            if (this.ctx.request.body.where != undefined) {
                let boom = `DELETE FROM ${this.ctx.params.schema}.${this.ctx.params.table}`
                let field = this.ctx.request.body.where.split("$")
                let value = field[1].split(".")
                boom = `${boom} WHERE ${field[0]} ${value[0]} ${value[1]}`
                this.app.logger.info(boom)
                await this.app.pg[this.ctx.params.database].query(boom)
                    .then(res => {
                        this.ctx.body = res;
                        this.ctx.status = 200;
                    },
                        err => {
                            this.ctx.body = err;
                            this.ctx.status = 500;
                        });
            } else {
                let context = {}
                context.message = "where参数不能为空";
                context.code = 403;
                this.ctx.body = context;
                this.ctx.status = 403;
            }
        } else {
            let context = {}
            context.message = "参数不能为空";
            context.code = 403;
            this.ctx.body = context;
            this.ctx.status = 403;
        };
    };
};

module.exports = TableController
