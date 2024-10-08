const cors= require('cors')
const io= require('socket.io')(8000,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]}
    })

const users={}
io.on('connection', socket=>
{
    socket.on('new-user-joined', name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message:message, name:users[socket.id]})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id]
    })
}
)
console.log("Connected.")