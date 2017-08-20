const fs = require('fs');
const BaseRoute = require(appRoot + '/routing/BaseRoute');

class GetKeysRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
        this.currentFolderNumber = 0;
        this.MAX_COUNT = 5;
    }

    get paramNames() {
        return ['searchParam'];
    }

    handle() {
        const result = [];
        const folders = fs.readdirSync('./base');

        this.foldersNumber = folders.length;

        for(let i = 0; i < folders.length; i++) {
            this.searchKeys(folders[i], result);
        }
    }

    searchKeys(folder, result) {
        fs.readFile(`./base/${folder}/${this.params.searchParam[0].toUpperCase()}`, 'utf-8', (err, fileData) => {
            this.currentFolderNumber++;

            if (!err && result.length < this.MAX_COUNT)
                this.pushKeyIfExist(JSON.parse(fileData), result);

            if (this.currentFolderNumber === this.foldersNumber || result.length >= this.MAX_COUNT)
                return this.complete(result);
        })
    }

    pushKeyIfExist(hashTable, result) {
        for (let key in hashTable) {
            if (result.length >= this.MAX_COUNT)
                break;

            const cattedKey = key.substr(0, this.params.searchParam.length);

            if (cattedKey === this.params.searchParam)
                result.push(key)
        }
    }
}

module.exports = GetKeysRoute;