//imports
const express = require("express");
const cors = require('cors');
const connectDB = require("./DB/db")
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

//connect to DB
connectDB()

//socket
// const httpServer = require("http").createServer(app);
// const options = { /* ... */ };
// const io = require("socket.io")(httpServer, options);

// io.on('connection', socket => {

//     socket.on('message', (message) => {
//         // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
//         // we make use of the socket.emit method again with the argument given to use from the callback function above
//         console.log('message: ', message)
//         io.sockets.emit('message', message)
//     })

//     // disconnect is fired when a client leaves the server
//     socket.on('disconnect', () => {

//     })
// })

//middleware
// app.use(compression());

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
// const postsRoute = require("./routes/posts");
// const receiverRoute = require("./routes/receivers")
// const deliveryRoute = require("./routes/deliveries")
// const divisonsRoute = require("./routes/divisons")
// const wsRoute = require("./routes/webSocket")


//middleware Routes
// app.use('/socket.io/?EIO=4&transport=polling&t=Nkbf1vn',wsRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
// app.use('/api/posts', postsRoute)
// app.use('/api/receiver', receiverRoute)
// app.use('api/divison', divisonsRoute)



//Error Handler - last middleware
app.use(errorHandler)


//listen to port
const port = process.env.PORT || 5000;
// server.listen(port);
// server.on("listening", () => {
//   console.log(`Listening on port:: http://localhost:${port}/`)
// })
app.listen(port, () => console.log(`Server is running on port: ${port}`))

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged Error: ${err}`);
})