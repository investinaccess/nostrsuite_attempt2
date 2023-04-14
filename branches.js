const branches = {};

function createBranch(repoName, branchName, latestCommitCID) {
  if (!branches[repoName]) {
    branches[repoName] = {};
  }

  branches[repoName][branchName] = latestCommitCID;
  console.log(`Created branch '${branchName}' in repository '${repoName}' with latest commit CID: ${latestCommitCID}`);
}

// Usage:
createBranch('my-repo', 'new-feature', 'bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjjnxiqbzzj727gv2on4');
