const { getMerkleDAG, addNodeToMerkleDAG } = require('./versionControl');
const { uploadFile } = require('./storage');

async function createNewCommit(parentCID, changes) {
  const newCommit = {
    parent: parentCID,
    changes: changes
  };

  const newCommitCID = await addNodeToMerkleDAG(newCommit);
  console.log(`Created new commit with CID: ${newCommitCID}`);
  return newCommitCID;
}

async function pushChanges(branchName, changes) {
  const branchCID = await getBranchCID(branchName); // You need to implement getBranchCID to fetch the CID of the latest commit of the given branch

  const newCommitCID = await createNewCommit(branchCID, changes);

  // Upload the new commit to Storj
  const commitFileName = `${newCommitCID}.json`;
  const commitFileContent = JSON.stringify(await getMerkleDAG(newCommitCID));
  await uploadFile(commitFileName, commitFileContent);

  // Update the branch reference to point to the new commit
  await updateBranchCID(branchName, newCommitCID); // You need to implement updateBranchCID to update the branch CID

  console.log(`Changes pushed to branch ${branchName}. New branch CID: ${newCommitCID}`);
}

module.exports = {
  pushChanges
};
