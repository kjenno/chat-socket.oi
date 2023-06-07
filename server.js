const io = require('socket.io')(3000)

const users = {}      // een array waar alle gebruikers in komen te staan

io.on('connection', socket => {       // deze word getriggerd wanneer iemand disconect om connect ook helpt het met nieuwe messages sturen naaar de clients 
  socket.on('new-user', name => {                         
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})