const { db } = require('./server/db');
const app = require('./server');
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;




const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});

const io = socketio(server);

let inMemoryDrawHistory = []; //doesnt do anything yet

io.on('connection', function (socket) {
  console.log(socket.id, 'A new client has connected!');

  // socket.join("room goes here")

  console.log("hiiiiiiiiiiii")

  socket.on('fill', function (x, y, color) {
    socket.broadcast.emit('fill', x, y, color);
  }); //this is currenlty sending this to

  socket.on('disconnect', function () {
    console.log('Goodbye, ', socket.id, ' :(');
  });
});

