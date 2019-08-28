// Initializes the `datas` service on path `/datas`
const createService = require('feathers-mongodb');
const hooks = require('./datas.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/datas', createService({paginate: false}));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('datas');

  mongoClient.then(db => {
    service.Model = db.collection('datas');
  });

  service.hooks(hooks);
};
