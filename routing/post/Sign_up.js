const BaseRoute = require(appRoot + '/routing/BaseRoute');

class SignUpRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['login', 'password', 'role', 'secret_key', 'name'];
    }

    async handle() {
        try {
            const exist = await this.core.db.users.getUserLoginExist(this.params.login);

            if (exist)
                return this.complete('Error: user already exist!');

            if (this.params.secret_key !== '123')
                return this.complete('Error: incorrect secret key');

            await this.core.db.users.addUser({login: this.params.login, password: this.params.password, role: this.params.role, name: this.params.name});
            this.complete(true);
        } catch (err) {
            this.complete(null, err, 'SignUp error');
        }
    }
}

module.exports = SignUpRoute;