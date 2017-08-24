const BaseRoute = require(appRoot + '/routing/BaseRoute');

class GetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['stock_id', 'login', 'password'];
    }

    async handle() {
        try {
            if (!(await this.core.db.users.getUser(this.params.login, this.params.password)))
                this.complete(null, {}, 'Incorrect user');

            const reserves = await this.core.db.reserves.get({stock_id: this.params.stock_id});

            for (let i = 0; i < reserves.length; i++) {
                reserves[i]._doc.author_name = (await this.core.db.users.getNameByLogin(reserves[i].author_login)).name;

                if (reserves[i].author_login !== this.params.login)
                    reserves[i]._doc.client = 'Не важно';
            }

            this.complete(reserves);
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = GetRoute;