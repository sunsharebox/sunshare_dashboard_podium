const { authenticate } = require('@feathersjs/authentication').hooks;
const userHooksLib = require('../../hooks/user.hooks.lib');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword(), userHooksLib.beforeCreateOrUpdateHook()],
    update: [ hashPassword(), userHooksLib.beforeCreateOrUpdateHook(), authenticate('jwt') ],
    patch: [ hashPassword(), userHooksLib.beforePatchHook(), authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      userHooksLib.afterAllHook(),
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
