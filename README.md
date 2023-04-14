PURPOSE

The purpose of this exploratory project is to create a decentralized version control system using a MerkleDAG-based data structure to track changes to code and files. The system leverages the Storj network as a decentralized file storage system for collaboration and integrates with the nostr protocol for account management and event publishing.

FUNCTIONALITY

A simple and intuitive command-line interface for managing repositories and collaborating with others.

INSTALLATION

To use this system, clone the repository from the GitHub page by clicking on the green "Code" button and selecting "Download ZIP." After the ZIP file is downloaded, extract it to a folder on your device. To install the necessary dependencies, navigate to the folder and run the following command in the command-line interface:

Copy code
npm install

This will install all the necessary dependencies and allow you to begin working with the system. Please note that you will need to create a storj-credentials.json file with your Storj account credentials in order to upload and download files to the network.

USAGE

To use the system, navigate to the folder where the repository was extracted and run the following command in the command-line interface:

Copy code
node cli.js
This will start the command-line interface for the system, which will allow you to create and manage repositories, collaborate with others, and publish events on the nostr protocol.


LICENSE

This project is licensed under the MIT License.
