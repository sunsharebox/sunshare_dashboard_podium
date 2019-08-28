class Handler {
  constructor() {
    // eslint-disable-next-line no-undef
    this.socket = io("http://localhost:3030/", {
      transports: ['websocket'],
      forceNew: true
    });
    this.feathers = feathers();

    this.feathers.configure(feathers.socketio(this.socket));

    this.feathers.configure(
      feathers.authentication({
        storage: window.localStorage
      })
    );

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  async isAuthenticated() {
    if (
      this.feathers.passport.payloadIsValid(
        await this.feathers.passport.getJWT()
      )
    ) {
      if (await this.feathers.get('user')) {
        return true;
      } else if ((await this.login()) === null) {
        return true;
      }
    }
    return false;
  }

  async logout() {
    await this.feathers.passport.getJWT();
    await this.feathers.logout();
  }

  async login(credentials) {
        try {
            let res;

            if (!credentials) {
                // Try to authenticate using the JWT from localStorage
                res = await this.feathers.authenticate();
            } else {
                // If we get login information, add the strategy we want to use for login
                const payload = Object.assign({ strategy: 'local' }, credentials);

                res = await this.feathers.authenticate(payload);
            }

            if (res.accessToken) {
                let payload = await this.feathers.passport.verifyJWT(res.accessToken);

                this.feathers.set('user', await this.feathers.service('users').get(payload.userId));
            } else throw new Error('no Access Token returned by the server');

            return null;
        } catch (error) {
            console.log(error);

            return error;
        }
    }

  async register(credentials) {
      await this.feathers.service('users').create(credentials);
  }
}

const apiHandler = new Handler();
