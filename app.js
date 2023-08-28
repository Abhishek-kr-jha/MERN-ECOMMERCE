const express = require('express');
const errorMiddleware = require("./Middleware/Error");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json())
app.use(cookieParser())

// route imports
const product = require("./routes/producteoute");
const user = require("./routes/userRoutes")


// middleware for error
app.use(errorMiddleware)


app.use("/api/v1",product)
app.use("/api/v1",user)
module.exports =app;
