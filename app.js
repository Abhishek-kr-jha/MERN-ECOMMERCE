const express = require('express');
const errorMiddleware = require("./Middleware/Error");

const app = express();
app.use(express.json())

// route imports
const product = require("./routes/producteoute");


// middleware for error
app.use(errorMiddleware)


app.use("/api/v1",product)
module.exports =app;
