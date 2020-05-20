const { db } = require('./server/db');
const app = require('./server');
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});

// const init = async () => {
//   await db.sync();
//   app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
// };

const io = socketio(server);

let inMemoryDrawHistory = []; //doesnt do anything yet

io.on('connection', (socket) => {
  console.log(socket.id, 'A new client has connected!');

  socket.on('fill', function (x, y, color, pixelSize, factor) {
    socket.broadcast.emit('fill', x, y, color, pixelSize, factor);
  });

  socket.on('disconnect', function () {
    console.log('Goodbye, ', socket.id, ' :(');
  });
});

// init();
