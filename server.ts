
import http from 'http';
import app from './src/app'; // Import your Express app
const PORT = process.env.PORT || 3000; // Set the port from environment variables or default to 3000

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});