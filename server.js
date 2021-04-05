const express = require('express');
const connectDB = require("./config/db");
const path = require("path");
var cors = require("cors");

const app = express();

// This is used to get the data from the body 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())


// Set the static folder
app.use(express.static(path.join(__dirname, 'public')))

// Database Connection
connectDB();

// Routes
app.use('/', require('./routes/index'));

// Setting the port 
port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on ${port}`));