const users = require('./users/users.service.js');
const datas = require('./datas/datas.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(datas);
};
