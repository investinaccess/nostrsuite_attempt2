function searchRepositories(searchTerm) {
  // Search for repositories that match the search term
  const matches = [];
  for (const repo of repositories) {
    if (repo.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      matches.push(repo);
    }
  }
  
  // Display the search results
  if (matches.length > 0) {
    console.log(`Found ${matches.length} repositories matching '${searchTerm}':`);
    for (const match of matches) {
      console.log(`- ${match.name} (${match.description})`);
    }
  } else {
    console.log(`No repositories found matching '${searchTerm}'.`);
  }
}
