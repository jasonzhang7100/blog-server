'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  // async index() {
  //   this.ctx.body = 'api test';
  // }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d') AS addTime, " +
      'article.view_count as view_count, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE type.id= ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d') AS addTime, " +
      'article.view_count as view_count, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id;';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      'article.article_content as article_content, ' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d') AS addTime, " +
      'article.view_count as view_count, ' +
      'type.typeName as typeName, ' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id = ' + id + ';';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
