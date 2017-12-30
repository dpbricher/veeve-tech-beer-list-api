(()=> {
  'use strict';

  const fs    = require('fs');
  const path  = require('path');

  class Database {
    constructor(dataRoot) {
      this.dataRoot = dataRoot || `${__dirname}/../data`;
      this.recordDir  = `${this.dataRoot}/records`;
      this.userDir  = `${this.dataRoot}/users`;

      [this.dataRoot, this.recordDir, this.userDir].forEach(dir => {
        if (!fs.existsSync(dir))
          fs.mkdirSync(dir);
      });
    }

    listRecords() {
      return fs.readdirSync(this.recordDir);
    }

    listUsers() {
      return fs.readdirSync(this.userDir);
    }

    createRecord(data) {
      this._createFile(this.recordDir, data);
    }

    createUser(data) {
      this._createFile(this.userDir, data);
    }

    getRecordList() {
      return this.listRecords().map((i)=> this._getRecordFile(i));
    }

    getRecordListReverse() {
      let list  = [];

      this.listRecords().reduceRight((_, i)=>
        list.push(this._getRecordFile(i)), 0);

      return list;
    }

    getUserList() {
      return this.listUsers().map(i => this._getUserFile(i));
    }

    _createFile(dir, data) {
      fs.writeFileSync(path.join(dir, `${new Date().toISOString()}.json`), JSON.stringify(data));
    }

    _getRecordFile(name) {
      return this._getJsonFileContent(this.recordDir, name);
    }

    _getUserFile(name) {
      return this._getJsonFileContent(this.userDir, name);
    }

    _getJsonFileContent(dir, name) {
      return JSON.parse(fs.readFileSync(path.join(dir, name)));
    }
  }

  module.exports  = Database;
})();
