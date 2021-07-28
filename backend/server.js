const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const colors = require("colors");
const { errorHanlder, notFound } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

// routes
const authRouter = require("./routes/authRouter");

// enviromental vars
dotenv.config();

const app = express();

// connect database
connectDb();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(fileupload());

// Mount routes
app.use("/api/v1/auth", authRouter);

// Error handler
app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 5008;

app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
