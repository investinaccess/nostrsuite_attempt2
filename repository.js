class Repository {
  constructor(bucketName) {
    this.bucketName = bucketName;
    this.nodes = new Map(); // Stores MerkleDAG nodes indexed by their CIDs
  }

  addNode(cid, node) {
    this.nodes.set(cid.toString(), node);
  }

  getNode(cid) {
    return this.nodes.get(cid.toString());
  }
}

module.exports = Repository;
