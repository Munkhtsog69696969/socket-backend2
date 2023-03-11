const express=require("express");

require("dotenv").config();

const app=express();

const https=require("https");

const cors=require("cors");

const port=1234;

app.use(cors());

const {Server}=require("socket.io");

const server=https.createServer(app);

const io=new Server(server,{
    cors: {
        origin:"https://quick-chat-frontend.web.app",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


io.on("connection",(socket)=>{
    // console.log(socket.id)

    socket.on("join_room",(data)=>{
        console.log(data)

        socket.join(data.room)
    })

    socket.on("send_messages",(data)=>{
        // console.log(data)

        socket.to(data.room).emit("received_messages", data);
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected with id:",socket.id)
    })
})

server.listen(port,()=>{
    console.log("Server listening at:",port)
})