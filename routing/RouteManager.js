const Methods = require(appRoot + '/routing/route_config/methods');

class RouteManager {
    constructor(core) {
        this.core = core;
    }

    handle(req, res) {
        this.core.log.debug(`Get ${req.method} request: ${req.url}`);
        req.sendError = this.sendError.bind(this);

        if (!Methods[req.method]) {
            this.core.log.warn(`request ${req.url} method ${req.method} is unsupported`);
            return req.sendError(res, 'UNSUPPORTED_METHOD', req.method);
        }

        this.createHandler(req, res);
    }

    async createHandler(req, res) {
        let [pathToHandler, params] = await this.getPathAndRequestParams(req, res);

        if (!pathToHandler)
            return null;

        try {
            const Action = require(appRoot + `/routing/${pathToHandler}`);
            new Action(this.core, req, res, params);
        } catch (err) {
            this.completeError(err, req, res);
        }
    }

    async getPathAndRequestParams(req, res) {
        let method = new Methods[req.method](req, res);

        let [params, err] = await this.getRequestParams(req, method);

        if (err)
            return [null, null];

        let pathToHandler = method.getPathToHandler(req);

        return [pathToHandler, params];
    }

    async getRequestParams(req, method) {
        let params = [], err;

        if (req.url !== '/upload')
            [params, err] = await method.getRequestParams();

        return [params, err];
    }

    sendIndex(req, res) {
        try {
            req.url = '/';
            const Action = require(appRoot + `/routing/get/index`);
            new Action(this.core, req, res);
        } catch (err) {
            this.completeError(err, req, res);
        }
    }

    completeError(err, req, res) {
        if (err.code === "MODULE_NOT_FOUND")
            return this.sendIndex(req, res);

        req.sendError(res, 'UNKNOWN_ERROR', err);
    }

    sendError(res, err, params) {
        err = this.core.errors[err](params);
        this.core.log.error(`Error: type ${err.error}, message: ${err.message}`);
        res.writeHead(err.status);
        res.end(JSON.stringify({error: err.error, message: err.message}));
    }
}

module.exports = RouteManager;