const WebSocket = require('ws');

class NostrConnector {
  constructor() {
    this.ws = null;
  }

  connect(url, onConnect, onMessage) {
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log('Connected to Nostr network');
      onConnect();
    });

    this.ws.on('message', (data) => {
      console.log(`Received message from Nostr network: ${data}`);
      onMessage(data);
    });

    this.ws.on('close', () => {
      console.log('Disconnected from Nostr network');
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      console.log('Disconnected from Nostr network');
    }
  }

  sendEvent(event) {
    if (this.ws) {
      this.ws.send(JSON.stringify(event));
    } else {
      console.error('NostrConnector is not connected');
    }
  }
}

module.exports = NostrConnector;
