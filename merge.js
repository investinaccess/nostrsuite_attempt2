const { getMerkleDAG, addNodeToMerkleDAG } = require('./versionControl');

async function findCommonAncestor(dag1CID, dag2CID) {
  const dag1 = await getMerkleDAG(dag1CID);
  const dag2 = await getMerkleDAG(dag2CID);

  if (dag1CID === dag2CID) {
    return dag1CID;
  }

  if (dag1.height < dag2.height) {
    return findCommonAncestor(dag1.parent, dag2CID);
  } else {
    return findCommonAncestor(dag1CID, dag2.parent);
  }
}

async function mergeBranches(baseBranchCID, featureBranchCID) {
  const commonAncestorCID = await findCommonAncestor(baseBranchCID, featureBranchCID);

  // In this simple example, we assume there are no conflicts when merging branches.

  const newCommit = {
    parent: baseBranchCID,
    changes: featureBranchCID
  };

  const newCommitCID = await addNodeToMerkleDAG(newCommit);
  console.log(`Merged feature branch CID ${featureBranchCID} into base branch CID ${baseBranchCID}. New commit CID: ${newCommitCID}`);

  return newCommitCID;
}

module.exports = {
  mergeBranches
};
