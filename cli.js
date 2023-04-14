const { program } = require('commander');
const VersionControl = require('./versionControl');
const Branches = require('./branches');
const Push = require('./push');
const Merge = require('./merge');
const SearchRepos = require('./searchRepos');

const versionControl = new VersionControl();
const branches = new Branches();
const push = new Push();
const merge = new Merge();
const searchRepos = new SearchRepos();

program
  .version('1.0.0')
  .description('A user-friendly command-line interface for managing repositories and collaborating with others using a MerkleDAG-based version control system and Storj for decentralized file storage.');

program
  .command('create-repo <name> [description]')
  .description('Create a new repository.')
  .action(async (name, description) => {
    try {
      const repo = await versionControl.createRepository(name, description);
      console.log(`Repository ${repo.name} created successfully!`);
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('clone-repo <cid> [name]')
  .description('Clone an existing repository.')
  .action(async (cid, name) => {
    try {
      const repo = await versionControl.cloneRepository(cid, name);
      console.log(`Repository ${repo.name} cloned successfully!`);
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('list-repos')
  .description('List all repositories.')
  .action(async () => {
    try {
      const repos = await searchRepos.search();
      console.log('Repositories:');
      repos.forEach((repo) => {
        console.log(`${repo.cid.toString()} - ${repo.name}`);
      });
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('create-branch <cid> <branch>')
  .description('Create a new branch in a repository.')
  .action(async (cid, branch) => {
    try {
      const branchCID = await branches.createBranch(cid, branch);
      console.log(`Branch ${branch} created successfully with CID ${branchCID.toString()}!`);
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('push <cid> <branch> <file>')
  .description('Push a file to a repository.')
  .action(async (cid, branch, file) => {
    try {
      const newCID = await push.pushFile(cid, branch, file);
      console.log(`File ${file} pushed successfully to branch ${branch} with CID ${newCID.toString()}!`);
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('merge <cid> <branch1> <branch2>')
  .description('Merge two branches in a repository.')
  .action(async (cid, branch1, branch2) => {
    try {
      const mergedCID = await merge.mergeBranches(cid, branch1, branch2);
      console.log(`Branch ${branch1} merged successfully with branch ${branch2} with CID ${mergedCID.toString()}!`);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse(process.argv);
