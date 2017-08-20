const fs = require('fs');
const util = require('util');
const formidable = require('formidable');
const BaseRoute = require(appRoot + '/routing/BaseRoute');

class UploadRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    handle() {
        const form = new formidable.IncomingForm();

        form.parse(this.req, (err, fields, files) => {
            this.res.writeHead(200, {'content-type': 'text/plain'});
            this.res.write(JSON.stringify({}));
            this.res.end(JSON.stringify({}));

            const fileName = files['uploads[]'].name;
            this.onFileUploaded(files['uploads[]'].path, fileName.slice(0, fileName.indexOf('.')));
        });
    }

    onFileUploaded(path, folderName) {
        let currentHashFile = {};
        let currentKey = (data[0])? data[0][0] : '0';
        const inputFile = this.readAndParseFile(path);

        for (let i = 0; i < inputFile.length; i++) {
            if (currentKey !== inputFile[i][0]) {
                this.createDirectoryIfNotExist(`./base/${folderName}`);
                fs.writeFileSync(`./base/${folderName}/${currentKey}`, JSON.stringify(currentHashFile));
                [currentKey, currentHashFile] = [inputFile[i][0], {}];
            }

            this.addKeyForHashFile(currentHashFile, inputFile[i]);
        }
    }

    readAndParseFile(path) {
        const data = fs.readFileSync(path, 'utf-8');
        return data.split('\n');
    }

    createDirectoryIfNotExist(path) {
        try {
            fs.mkdirSync(path, (err) => {});
        } catch (err) {}
    }

    addKeyForHashFile(hashTable, el) {
        const [key, value] = el.split(' \t');

        if (!hashTable[key])
            return hashTable[key] = [value];

        hashTable[key].push(value);
    }
}

module.exports = UploadRoute;