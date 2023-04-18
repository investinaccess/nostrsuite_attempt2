const fs = require('fs').promises;
const { getBranchCID, updateBranchCID } = require('./branchUtil');

// Mock the file system to avoid actual file operations
jest.mock('fs', () => {
  return {
    promises: {
      readFile: jest.fn(),
      writeFile: jest.fn()
    }
  };
});

describe('branchUtil', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getBranchCID should return the correct CID for a branch', async () => {
    // Set up the mock data
    const branches = { main: 'someCID' };
    fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(branches));

    // Test the function
    const result = await getBranchCID('main');
    expect(result).toBe('someCID');
  });

  test('updateBranchCID should update the CID for a branch', async () => {
    // Set up the mock data
    const branches = { main: 'oldCID' };
    fs.promises.readFile.mockResolvedValueOnce(JSON.stringify(branches));

    // Test the function
    await updateBranchCID('main', 'newCID');

    // Verify the writeFile call
    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      'branches.json',
      JSON.stringify({ main: 'newCID' }),
      'utf-8'
    );
  });
});

