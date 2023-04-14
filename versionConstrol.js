const { DAGNode, util } = require('ipld-dag-cbor');
const { CID } = require('multiformats');

class VersionControl {
  async createMerkleDAGNode(data) {
    const node = new DAGNode(data);
    const serialized = util.serialize(node);
    const cid = await CID.create('dag-cbor', util.cid(serialized));
    return { node, cid };
  }

  async linkNodes(parentCID, childCID) {
    const parentNode = await this.repository.getNode(parentCID);
    const childNode = await this.repository.getNode(childCID);

    if (!parentNode || !childNode) {
      throw new Error('Invalid parent or child CID.');
    }

    parentNode.addLink(childCID.toString(), childNode);
    const updatedParent = await this.createMerkleDAGNode(parentNode);
    this.repository.addNode(updatedParent.cid, updatedParent.node);
    return updatedParent.cid;
  }
}

module.exports = VersionControl;
