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

async function pull() {
  const branches = await repository.listBranches();
  const selectedBranch = await promptBranch(branches);

  const remoteNode = await repository.getRemoteBranchNode(selectedBranch);
  const localNode = await repository.getLocalBranchNode(selectedBranch);

  if (remoteNode.cid.equals(localNode.cid)) {
    console.log(`Your local branch is up to date with the remote branch ${selectedBranch}.`);
  } else {
    console.log(`Pulling changes from the remote branch ${selectedBranch}...`);
    const changes = await versionControl.getChanges(localNode, remoteNode);

    if (changes.length === 0) {
      console.log(`No changes to pull from the remote branch ${selectedBranch}.`);
    } else {
      for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        console.log(`Applying change ${i + 1} of ${changes.length}...`);
        await versionControl.applyChange(change, repository);
        await nostrConnector.publishEvent(change);
      }
      console.log(`Changes have been pulled from the remote branch ${selectedBranch}.`);
    }
  }
}

async function promptBranch(branches) {
  if (branches.length === 1) {
    console.log(`The only branch available is ${branches[0]}.`);
    return branches[0];
  }

  console.log('The following branches are available:');
  branches.forEach((branch) => console.log(`- ${branch}`));

  let selectedBranch;
  while (!selectedBranch) {
    selectedBranch = await prompt('Enter the name of the branch you want to pull changes from: ');
    if (!branches.includes(selectedBranch)) {
      console.log(`Branch ${selectedBranch} does not exist.`);
      selectedBranch = null;
    }
  }

  return selectedBranch;
}

module.exports = { pull };
