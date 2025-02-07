const express = require("express");
const mongoURI = require('./config/db');
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/bookModels");
const bookRoute = require("./routes/booksRoute");
const server = express();

//Middleware for parsing request in the body
server.use(express.json());
server.use(cors({ 
    origin: 'http://localhost:5173',
     methods: ['GET,POST,PUT,DELETE'],
     allowedHeaders: ['Content-Type'],
     }));

server.get('/', (req, res) =>{
    console.log(req);
    return res.status(200).send("welcome to MERN stack");
});

server.use('/books', bookRoute);

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('App connected to database')
        const port = process.env.PORT;
        server.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
        }); 
    })
    .catch((error) => {
        console.log(error)
    });