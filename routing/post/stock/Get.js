const BaseRoute = require(appRoot + '/routing/BaseRoute');

class GetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    async handle() {
        try {
            this.complete(await this.core.db.stocks.getWithReserves());
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = GetRoute;