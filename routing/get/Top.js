const BaseRoute = require(appRoot + '/routing/BaseRoute');

class TopRoute extends BaseRoute{
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    async handle() {
        let result = [];
        let top = await this.core.db.searches.getTop(5);

        for(let i = 0; i < top.length; i++) {
            result.push(top[i].search);
        }

        this.complete(result);
    }
}

module.exports = TopRoute;