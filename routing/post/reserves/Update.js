const BaseRoute = require(appRoot + '/routing/BaseRoute');

class AddRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['login', 'password', 'reserves'];
    }

    async handle() {
        try {
            if (!(await this.core.db.users.getUser(this.params.login, this.params.password)))
                this.complete(null, {}, 'Incorrect user');

            const prms = [];
            const added = this.params.reserves.added || [];
            const updated = this.params.reserves.updated || [];
            const deleted = this.params.reserves.deleted || [];

            for (let i = 0; i < added.length; i++) {
                if (added[i].stock_id && added[i].count && added[i].client && added[i].date) {
                    added[i].author_login = this.params.login;
                    delete added[i]._id;

                    prms.push(this.core.db.reserves.add(added[i]))
                }
            }

            for (let i = 0; i < updated.length; i++) {
                if (updated[i].stock_id && updated[i].count && updated[i].client && updated[i].date)
                    prms.push(this.core.db.reserves.update({
                        count: updated[i].count,
                        payment: updated[i].payment,
                        unloading_date: updated[i].unloading_date,
                        client: updated[i].client,
                        payment_id: updated[i].payment_id,
                        maker: updated[i].maker,
                        make_date: updated[i].make_date
                    }, {id: updated[i], stock_id: updated[i].stock_id}))
            }

            for (let i = 0; i < deleted.length; i++) {
                if (deleted[i]._id && deleted[i].stock_id)
                    prms.push(this.core.db.reserves.delete({
                        _id: deleted[i]._id,
                        stock_id: deleted[i].stock_id,
                        author_login: this.params.login
                    }))
            }

            await Promise.all(prms);
            this.complete(true);
        } catch (err) {
            this.complete(null, err, 'Reserves update error');
        }
    }
}

module.exports = AddRoute;