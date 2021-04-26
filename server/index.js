const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose=require('mongoose');
const multer=require('multer');

const app = express();
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));



const router = require('./Controller/router');

app.use(router);
const server = require("http").createServer(app);
//app.use(cors());

//establish socket.io connection


/*const io = require("socket.io")(server);

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});
const connection = mongoose.connection;
const menulist = connection.collection("fieldModel").watch();

menulist.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const data = {
          fieldname:req.body.fieldname                                
        };

        io.of("/api/socket").emit("newThought", data);
        break;

      case "delete":
        io.of("/api/socket").emit("deletedThought", change.documentKey._id);
        break;
    }
  });*/

//db connection
mongoose.connect('mongodb://localhost:27017/restaurentDB',{useNewUrlParser:true},(err)=>{
	if(!err){
		console.log('mongodb connected')
	}
	else{
		console.log("not connected:"+err)
	}
});


server.listen(process.env.PORT || 1000, () => console.log(`Server has started. at port 1000`));
