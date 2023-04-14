const { prompt } = require('enquirer');
const { Storage } = require('./storage');
const { Repository } = require('./repository');
const { VersionControl } = require('./versionControl');
const { NostrConnector } = require('./nostr-connector');

const bucketName = 'your-bucket-name';
const accessGrant = 'your-access-grant-here';

const storage = new Storage(accessGrant);
const repository = new Repository(bucketName, storage);
const versionControl = new VersionControl(repository);

const nostrConnector = new NostrConnector();

async function merge() {
  const branches = await repository.listBranches();
  const selectedBranch = await promptBranch(branches);

  const localNode = await repository.getLocalBranchNode(selectedBranch);
  const remoteNode = await repository.getRemoteBranchNode(selectedBranch);

  const changes = await versionControl.getChanges(localNode, remoteNode);

  if (changes.length === 0) {
    console.log(`No changes to merge from the remote branch ${selectedBranch}.`);
    return;
  }

  console.log(`Merging changes from the remote branch ${selectedBranch}...`);
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i
