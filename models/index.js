const { sequelize } = require("./connection");
const Board = require("./board");

const db = {};

db.sequelize = sequelize;

// model 생성
db.Board = Board;

// model init
Board.init(sequelize);

module.exports = db;
