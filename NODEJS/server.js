const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname,"public")));
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

io.on("connection",(socket)=>{
    socket.on("updateLocation",(pos)=>{
        console.log(pos);
        socket.emit("updated-Location",pos);
    })
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running`);

});
