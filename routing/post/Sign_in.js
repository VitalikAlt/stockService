const BaseRoute = require(appRoot + '/routing/BaseRoute');

class SignInRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['login', 'password'];
    }

    async handle() {
        try {
            const res = await this.core.db.users.getUser(this.params.login, this.params.password);

            if (!res)
                return this.complete(null, 'Error: incorrect login or password');

            this.complete(res.role);
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = SignInRoute;