const net = require('net');
const tls = require('tls');

const HOST = 'ep-weathered-breeze-a113zk4h-pooler.ap-southeast-1.aws.neon.tech';
const PORT = 5432;

console.log('Attempting to connect and send Postgres SSL Request...');
const socket = net.createConnection(PORT, HOST, () => {
    console.log('Connected to TCP proxy, sending SSL Request...');
    const buf = Buffer.alloc(8);
    buf.writeInt32BE(8, 0);
    buf.writeInt32BE(80877103, 4);
    socket.write(buf);
});

socket.on('data', (data) => {
    console.log('Received raw data:', data.toString('hex'), '(' + data.toString('utf8') + ')');
    if (data.toString('utf8') === 'S') {
        console.log('Server agreed to SSL, upgrading connection...');
        const tlsSocket = tls.connect({
            socket: socket,
            servername: HOST
        }, () => {
            console.log('TLS connected. The proxy is active.');
            tlsSocket.end();
        });
        tlsSocket.on('data', (d) => console.log('TLS data:', d.toString()));
        tlsSocket.on('error', (e) => console.log('TLS error:', e.message));
    } else {
        console.log('Server rejected SSL or returned an error.');
        socket.end();
    }
});

socket.on('error', (err) => {
    console.error('Socket error:', err.message);
});

socket.on('close', () => {
    console.log('Socket closed.');
});
