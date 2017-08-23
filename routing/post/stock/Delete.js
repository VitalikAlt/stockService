const BaseRoute = require(appRoot + '/routing/BaseRoute');

class DeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id'];
    }

    get secretRequest() {
        return true;
    }

    async handle() {
        try {
            await this.core.db.stocks.delete({_id: this.params.id});
            this.complete(await this.core.db.stocks.getWithReserves());
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = DeleteRoute;