const fs = require('fs');
const BaseRoute = require(appRoot + '/routing/BaseRoute');

class SearchRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
        this.currentFolderNumber = 0;
        this.added = false;
    }

    get paramNames() {
        return ['searchParam'];
    }

    handle() {
        const result = [];
        const folders = fs.readdirSync('./base');

        this.foldersNumber = folders.length;

        for(let i = 0; i < folders.length; i++) {
            this.searchDescriptions(folders[i], result);
        }
    }

    searchDescriptions(folder, result) {
        fs.readFile(`./base/${folder}/${this.params.searchParam[0].toUpperCase()}`, 'utf-8', (err, data) => {
            this.currentFolderNumber++;

            if (!err)
                this.pushWordIfExist(JSON.parse(data), result);

            if (this.currentFolderNumber === this.foldersNumber)
                return this.complete(result);
        })
    }

    pushWordIfExist(hashTable, result) {
        for (let key in hashTable) {
            const cattedKey = key.substr(0, this.params.searchParam.length);

            if (cattedKey === this.params.searchParam) {
                this.addSearch(this.params.searchParam);
                result.push({key, value: hashTable[key]})
            }
        }
    }

    async addSearch(search) {
        if (this.added)
            return null;

        this.added = true;

        const count = (await this.core.db.searches.getCount(search)) || 0;
        this.core.db.searches.addCount({search, count: count + 1});
    }
}

module.exports = SearchRoute;