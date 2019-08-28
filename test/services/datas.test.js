const assert = require('assert');
const app = require('../../src/app');

describe('\'datas\' service', () => {
  it('registered the service', () => {
    const service = app.service('datas');

    assert.ok(service, 'Registered the service');
  });
});
