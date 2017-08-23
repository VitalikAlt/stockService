const BaseRoute = require(appRoot + '/routing/BaseRoute');

class AddRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['login', 'password', 'stock_id', 'count', 'client', 'date'];
    }

    async handle() {
        try {
            if (!(await this.core.db.users.getUser(this.params.login, this.params.password)))
                this.complete(null, {}, 'Incorrect user');

            await this.core.db.reserves.add(this.params);
            this.complete(true);
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = AddRoute;