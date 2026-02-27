const net = require('net');
const server = net.createServer();

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port 5000 is in use');
  } else {
    console.log('Error:', err.message);
  }
  process.exit();
});

server.once('listening', () => {
  console.log('Port 5000 is free');
  server.close();
  process.exit();
});

server.listen(5000);
