const BaseRoute = require(appRoot + '/routing/BaseRoute');

class DeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id', 'login', 'password', 'stock_id'];
    }

    async handle() {
        try {
            const [user, reserve] = await Promise.all([
                this.db.users.getUser(this.params.login, this.params.password),
                this.db.reserves.get({_id: this.params.id, stock_id: this.params.stock_id})
            ]);

            if (!user[0] || !reserve[0] || reserve[0].author_login !== user[0].login)
                this.complete(null, {}, 'Incorrect user or reserve');

            await this.core.db.reserves.delete({_id: this.params.id});
            this.complete(true);
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }
}

module.exports = DeleteRoute;