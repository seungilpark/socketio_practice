const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4000;
const cors = require('cors')
const app = express();
app.use(cors())
const server = http.createServer(app); // what diff b/w app / server?


const io = socketIo(server); 

//  will creating a socket on a router 
//      allow using different namespaces based on different endpoints?

io.on("connection", socket => {
    console.log("New client connected", socket.id);
    socket.emit("init", socket.id);
    socket.on("chat", (data)=>{
        console.log(data);
        //Here we broadcast it out to all other sockets 
        //  EXCLUDING the socket which sent us the data
        socket.broadcast.emit("chat", data);
    });

    socket.on("disconnect", (socket) => console.log("Client disconnected", socket.id));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
