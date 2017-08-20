const fs = require('fs');
const BaseRoute = require(appRoot + '/routing/BaseRoute');

class AddWordRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['key', 'value'];
    }

    handle() {
        let file;
        const currentName = this.params.key[0];
        this.createDirectoryIfNotExist(`./base/alone`);

        if (fs.existsSync(`./base/alone/${currentName}`)) {
            file = fs.readFileSync(`./base/alone/${currentName}`, 'utf-8');
            file = JSON.parse(file);
        }

        this.addKeyForHashFile(file, this.params);
        fs.writeFileSync(`./base/alone/${currentName}`, JSON.stringify(file));
        this.complete('ok');
    }

    createDirectoryIfNotExist(path) {
        try {
            fs.mkdirSync(path, (err) => {});
        } catch (err) {}
    }

    addKeyForHashFile(hashTable, el) {
        if (!hashTable[el.key])
            return hashTable[el.key] = [el.value];

        hashTable[el.key].push(el.value);
    }
}

module.exports = AddWordRoute;