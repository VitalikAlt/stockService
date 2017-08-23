const BaseRoute = require(appRoot + '/routing/BaseRoute');

class AddRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['name', 'size', 'growth', 'count'];
    }

    get secretRequest() {
        return true;
    }

    async handle() {
        try {
            const createParams = {name: this.params.name, size: this.params.name, growth: this.params.growth};
            const stocks = await this.core.db.stocks.get(createParams);

            createParams.count = this.params.count;

            if (stocks[0])
                this.complete(null, {}, 'Item already exists');

            const res = await this.core.db.stocks.add(createParams);
            this.complete(await this.core.db.stocks.getWithReserves());
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = AddRoute;