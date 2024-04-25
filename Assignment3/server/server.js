const net = require('net');
const fs = require('fs');
const crypto = require('crypto');

const HOST = process.argv[2] || "localhost";
const PORT = process.argv[3] || 8080;


const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}`);

  // Generate 1KB of text data
  const textData = "This is a text-based 1KB file. ".repeat(32); // Approx. 1KB

  // Write the text data to a file
  const fileName = 'text_file.txt';
  fs.writeFileSync(fileName, textData);

  // Calculate the MD5 checksum
  const hasher = crypto.createHash('md5');
  hasher.update(textData);
  const checksum = hasher.digest('hex');

  console.log(`Checksum for the generated file: ${checksum}`);

  // Send the file to the client
  const fileStream = fs.createReadStream(fileName);
  fileStream.pipe(socket);

  socket.on('end', () => {
    console.log(`Client disconnected: ${socket.remoteAddress}`);
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});

