const WebSocket = require('ws');
const { sign } = require('./crypto'); // import your crypto functions

class NostrClient {
  constructor(url, privateKey) {
    this.url = url;
    this.privateKey = privateKey;
    this.connection = null;
    this.subscriptions = new Map();
    this.pendingMessages = new Map();
    this.lastId = 0;
  }

  async connect() {
    if (this.connection) {
      throw new Error('Connection already established');
    }

    const token = sign('connect', this.privateKey); // sign the connect message

    this.connection = new WebSocket(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.connection.on('open', () => {
      console.log('Connected to Nostr network');
      // send any pending messages after connection is established
      this.pendingMessages.forEach((msg, id) => {
        this.connection.send(msg);
        this.pendingMessages.delete(id);
      });
    });

    this.connection.on('message', (data) => {
      const message = JSON.parse(data);

      if (message.id && this.subscriptions.has(message.id)) {
        // resolve the promise for this subscription
        this.subscriptions.get(message.id).resolve(message.result);
        this.subscriptions.delete(message.id);
      }
    });

    this.connection.on('close', () => {
      console.log('Connection closed');
      // attempt to reconnect after a short delay
      setTimeout(() => this.connect(), 5000);
    });
  }

  async subscribe(event, params = []) {
    const id = ++this.lastId;

    const payload = JSON.stringify({
      id,
      method: 'subscribe',
      params: [event, ...params],
    });

    if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
      // connection not established, save message for later
      this.pendingMessages.set(id, payload);
      return new Promise((resolve, reject) => {
        this.subscriptions.set(id, { resolve, reject });
      });
    }

    this.connection.send(payload);
    return new Promise((resolve, reject) => {
      this.subscriptions.set(id, { resolve, reject });
    });
  }

  async unsubscribe(event) {
    const id = ++this.lastId;

    const payload = JSON.stringify({
      id,
      method: 'unsubscribe',
      params: [event],
    });

    if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
      throw new Error('Connection not established');
    }

    this.connection.send(payload);
    return new Promise((resolve, reject) => {
      this.subscriptions.set(id, { resolve, reject });
    });
  }

  async call(method, params = []) {
    const id = ++this.lastId;

    const payload = JSON.stringify({
      id,
      method,
      params,
    });

    if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
      throw new Error('Connection not established');
    }

    this.connection.send(payload);
    return new Promise((resolve, reject) => {
      this.subscriptions.set(id, { resolve, reject });
    });
  }
}

module.exports = NostrClient;
