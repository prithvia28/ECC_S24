const net = require('net');
const fs = require('fs');
const crypto = require('crypto');

const SERVER_ADDR = process.argv[2] || "localhost";
const PORT = process.argv[3] || 8080;

const client = new net.Socket();

client.connect(PORT, SERVER_ADDR, () => {
  console.log(`Connected to server at ${SERVER_ADDR}:${PORT}`);

  const receivedData = [];

  client.on('data', (data) => {
    receivedData.push(data); // Collect received data
    console.log(`Received data from server: ${data.toString()}`); // Log received data
  });
 
  client.on('end', () => {
    const buffer = Buffer.concat(receivedData); // Concatenate all received data

    // Save the data to a file
    fs.writeFileSync('received_file.txt', buffer);

    // Calculate the MD5 checksum
    const hasher = crypto.createHash('md5');
    hasher.update(buffer);
    const checksum = hasher.digest('hex');

    console.log(`Received a file with checksum: ${checksum}`);
  });

  client.on("end", () => {
    console.log("Disconnected from server");
  });

  client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
});
