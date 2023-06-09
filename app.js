const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const corsConfig = require("./config/corsConfig.json");
const models = require("./models/index");

const logger = require("./lib/logger");

dotenv.config();
const { NODE_ENV, PORT, LOGGER_LEVEL } = process.env;

const indexRouter = require("./routes/index");

const app = express();
logger.info("app start");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// DB 연결 확인 및 table 생성
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

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use("/", indexRouter);

// 404를 catch해서 error handler로 전달
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 오류 페이지 렌더링
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
