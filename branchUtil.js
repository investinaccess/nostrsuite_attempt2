const fs = require('fs').promises;

const branchesFilePath = 'branches.json';

async function getBranches() {
  try {
    const data = await fs.readFile(branchesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading branches file:', err);
    return {};
  }
}

async function getBranchCID(branchName) {
  const branches = await getBranches();
  return branches[branchName];
}

async function updateBranchCID(branchName, newCID) {
  const branches = await getBranches();
  branches[branchName] = newCID;
  await fs.writeFile(branchesFilePath, JSON.stringify(branches), 'utf-8');
}

module.exports = {
  getBranchCID,
  updateBranchCID
};
