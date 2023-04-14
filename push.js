const Repository = require('./repository');
const Storage = require('./storage');
const VersionControl = require('./versionControl');
const NostrConnector = require('./nostr-connector');

const bucketName = 'your-bucket-name';
const accessGrant = 'your-access-grant-here';

const repository = new Repository(bucketName);
const storage = new Storage(accessGrant);
const versionControl = new VersionControl();
const nostrConnector = new NostrConnector();

async function push(branchName, filePath, commitMessage, author) {
  // Upload file to Storj
  const objectKey = await storage.upload(bucketName, filePath);
  console.log(`File uploaded to Storj with Object Key: ${objectKey}`);

  // Create MerkleDAG node for the file
  const { node, cid } = await versionControl.createMerkleDAGNode({ objectKey, commitMessage, author });
  console.log(`MerkleDAG Node created with CID: ${cid}`);

  // Link node to branch
  await versionControl.linkNodes(branchName, cid);

  // Publish event on Nostr network
  const event = {
    type: 'push',
    repository: 'your-repo-name',
    branch: branchName,
    author,
    commitMessage,
    timestamp: Date.now(),
  };
  await nostrConnector.publish(event);

  console.log('Push successful');
}

module.exports = push;
