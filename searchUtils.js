class SearchUtils {
  constructor(repository) {
    this.repository = repository;
  }

  async searchReposByName(name) {
    const nodes = await this.repository.getAllNodes();
    const matches = nodes.filter((node) => node.name === name);
    return matches;
  }
}

module.exports = SearchUtils;
