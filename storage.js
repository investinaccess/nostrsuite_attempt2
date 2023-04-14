const fs = require('fs');
const { Storj } = require('@storj/cli');

class Storage {
  constructor(accessGrant) {
    this.storj = new Storj(accessGrant);
  }

  async upload(bucket, filePath) {
    const fileName = filePath.split('/').pop();
    const fileContent = fs.readFileSync(filePath);
    const { objectKey } = await this.storj.uploadObject(bucket, fileName, fileContent);
    return objectKey;
  }

  async download(bucket, objectKey) {
    const fileContent = await this.storj.downloadObject(bucket, objectKey);
    return fileContent;
  }
}

module.exports = Storage;
