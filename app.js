const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const corsConfig = require("./config/corsConfig.json");
// const logger = require('morgan'); // 구코드 삭제
const logger = require("./lib/logger");
const models = require("./models/index");

const indexRouter = require("./routes/index");
// const  usersRouter = require('./routes/users'); // 구코드 삭제

const app = express();
logger.info("app start");

const { NODE_ENV } = process.env;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors(corsConfig));
// app.use(logger('dev')); // 구코드 삭제
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("uploads"));

app.use("/", indexRouter);
// app.use('/users', usersRouter); // 구코드 삭제

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
dotenv.config();

models.sequelize
  .authenticate()
  .then(() => {
    logger.info("DB connection success");

    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        logger.info("Sequelize sync success");
      })
      .catch((err) => {
        logger.error("Sequelize sync error", err);
      });
  })
  .catch((err) => {
    logger.error("DB Connection fail", err);
  });
