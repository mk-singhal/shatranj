import { io, Socket } from 'socket.io-client';

// Connect to the server
const socket: Socket = io('http://localhost:3000');

// Handle connection event
socket.on('connect', () => {
  console.log('Connected to server');
});

// Handle custom event
socket.on('customEvent', (data: any) => {
  console.log('Received data:', data);
});

// Emit custom event
socket.emit('customEvent', { message: 'Hello, server!' });