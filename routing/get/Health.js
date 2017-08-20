const BaseRoute = require(appRoot + '/routing/BaseRoute');

class Health extends BaseRoute{
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    handle() {
        this.complete('OK');
    }
}

module.exports = Health;