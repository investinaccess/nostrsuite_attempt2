const storj = require('storj-lib');
const storjCredentials = require('./storj-credentials.json');

// Setup the Storj environment
const storjEnv = new storj.Environment('development');
const storjKeys = storj.BridgeApi.generateKeys();

// Setup the Storj client
const storjClient = storj.BridgeClient(storjKeys, storjCredentials);

// Create a bucket for the repository
const bucketName = 'my-repository-bucket';
storjClient.createBucket(bucketName, (err, bucket) => {
  if (err) {
    console.error('Error creating bucket:', err);
    return;
  }
  console.log(`Bucket created: ${bucketName}`);
});

// Upload a file to the bucket
const filePath = '/path/to/my-file.txt';
const fileName = 'my-file.txt';
bucket.storeFile(fileName, filePath, (err, file) => {
  if (err) {
    console.error('Error storing file:', err);
    return;
  }
  console.log(`File stored: ${file.id}`);
});

// Download a file from the bucket
const fileId = 'my-file-id';
const fileDownloadPath = '/path/to/downloaded-file.txt';
bucket.getFile(fileId, fileDownloadPath, (err, file) => {
  if (err) {
    console.error('Error downloading file:', err);
    return;
  }
  console.log(`File downloaded: ${fileId}`);
});
