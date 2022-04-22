const express= require('express')
const app=express()
const port=process.env.PORT || 3000
//const io= require('socket.io')(port)// passing function tothe port. socket.io will run on port
const server= require("http").createServer(app)
const io= require('socket.io')(server)
const path = require("path")
const static_path= path.join(__dirname,"./public")
// app.listen(port, ()=>{
//     console.log(`Server is running at port no ${port}`);
// })
//io.on("connection",socket =>{console.log(socket.id)}) // callback function will run everytime a client connects to our server and socket instance will be given to them
app.use(express.static(static_path)) // or //app.use(express.static(__dirname + '/public'))
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/index.html`) //eita or res.sendFile(__dirname+"/index.html")
})


server.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);
})

io.on("connection",(socket) =>{
    console.log(`connected`)
    socket.on('message', (msg) => {
         socket.broadcast.emit('message', msg) // server is broadcasting appended message to every client i.e browsers who are connected via socket
        })                                      // except the browser who has send the appended message

})
