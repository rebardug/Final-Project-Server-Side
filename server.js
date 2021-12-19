//imports
const express = require("express");
const cors = require('cors');
const connectDB = require("./DB/db")
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

//connect to DB
connectDB()


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

//middleware Routes
app.use('/api/auth', authRoute)
//app.use('/api/user', userRoute)
app.use('/api/test', userRoute)
// app.use('/api/posts', postsRoute)

//Error Handler - last middleware
app.use(errorHandler)


//listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`))

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged Error: ${err}`);
})