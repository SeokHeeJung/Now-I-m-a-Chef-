const http = require('http');
const crypto = require('crypto');

const clients = new Set();

function encodeFrame(data) {
    const buf = Buffer.from(data);
    const len = buf.length;
    if (len < 126) {
        return Buffer.concat([Buffer.from([0x81, len]), buf]);
    } else if (len < 65536) {
        return Buffer.concat([Buffer.from([0x81, 126, len >> 8, len & 0xff]), buf]);
    } else {
        const b1 = (len >> 24) & 0xff;
        const b2 = (len >> 16) & 0xff;
        const b3 = (len >> 8) & 0xff;
        const b4 = len & 0xff;
        return Buffer.concat([
            Buffer.from([0x81, 127, 0, 0, 0, 0, b1, b2, b3, b4]),
            buf,
        ]);
    }
}

function setup(app) {
    const server = http.createServer(app);
    server.on('upgrade', (req, socket) => {
        if (req.headers['upgrade'] !== 'websocket') {
            socket.end('HTTP/1.1 400 Bad Request');
            return;
        }
        const key = req.headers['sec-websocket-key'];
        const hash = crypto
            .createHash('sha1')
            .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
            .digest('base64');
        socket.write(
            'HTTP/1.1 101 Switching Protocols\r\n' +
            'Upgrade: websocket\r\n' +
            'Connection: Upgrade\r\n' +
            `Sec-WebSocket-Accept: ${hash}\r\n` +
            '\r\n'
        );
        clients.add(socket);
        socket.on('close', () => clients.delete(socket));
    });
    return server;
}

function broadcast(data) {
    const msg = encodeFrame(JSON.stringify(data));
    clients.forEach((ws) => ws.write(msg));
}

module.exports = { setup, broadcast };