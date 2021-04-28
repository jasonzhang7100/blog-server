/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618134601979_1458';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root123456',
      database: 'blog_demo'
    },
    app: true,
    agent: false,
  };

  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*']
  };

  config.cors = {
    // origin: 'http://localhost:3000',
    credentials: true,
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
