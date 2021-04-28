'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  // async index() {
  //   this.ctx.body = 'api test';
  // }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}';`;
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: 'Login Success', openId };
      // console.log(this.ctx.session.openId);
    } else {
      this.ctx.body = { data: 'Login Failure' };
    }
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async addArticle() {
    const tempArticle = this.ctx.request.body;
    // console.log(tempArticle);
    const result = await this.app.mysql.insert('article', tempArticle);
    // console.log(result);

    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = { insertSuccess, insertId };
  }

  async updateArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = { updateSuccess };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduce as introduce, ' +
      "DATE_FORMAT(article.addTime, '%Y-%m-%d') AS addTime, " +
      'article.view_count as view_count, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'ORDER BY article.id DESC;';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async delArticle() {
    const id = this.ctx.params.id;
    const result = await this.app.mysql.delete('article', { 'id': id });
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
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id = ' + id + ';';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
