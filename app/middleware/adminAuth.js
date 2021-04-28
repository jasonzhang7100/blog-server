'use strict';

module.exports = () => {
  return async (ctx, next) => {
    // console.log(ctx.session.openId);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: 'Not Login' };
    }
  };
};
