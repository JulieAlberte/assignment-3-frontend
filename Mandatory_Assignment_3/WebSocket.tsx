// import * as express from 'express';
// import * as http from 'http';
// import * as io from 'socket.io';
// import { func } from 'prop-types';
// import { SocketOptions } from 'dgram';
// import { Server } from 'ws';

// const PORT_NUMBER = 3001;
// const WS_PORT_NUMBER = 3000;

// const app = express();
// app.get('/')
// const httpServer = app.listen(PORT_NUMBER, "localhost", () => {
//     console.log(`HTTP on %d`, PORT_NUMBER);
// });

// const wsServer = new Server({port:WS_PORT_NUMBER});
// console.log('Webscoket server is listenting on localhost:3000');

// wsServer.on('connection', wsServer => {
//         wsServer.send("Message from the WebSocket server");
//     wsServer.onerror = (error) =>
//         console.log(`The server received: ${error['code']}`);
// });

// wsServer.on('connection', (client) => {
//     client.on('newHighScore', (highScore) => {
//         console.log('Client has achieved a new highscore: ', highScore);
//     });
// });