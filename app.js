const Repository = require('./repository');
const Storage = require('./storage');
const VersionControl = require('./versionControl');

async function main() {
  const bucketName = 'your-bucket-name';
  const accessGrant = 'your-access-grant-here';

  const repository = new Repository(bucketName);
  const storage = new Storage(accessGrant);
  const versionControl = new VersionControl();

  // Upload a file to Storj
  const objectKey = await storage.upload(bucketName, './example.txt');
  console.log(`File uploaded to Storj with Object Key: ${objectKey}`);

  // Download the file from Storj
  const fileContent = await storage.download(bucketName, objectKey);
  console.log('Downloaded file content:', fileContent.toString());

  // Create a MerkleDAG node with the Object Key
  const { node, cid } = await versionControl.createMerkleD
