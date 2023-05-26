const { sequelize } = require("./connection");
const Board = require("./board");
const User = require("./user");
const Post = require("./post");

const db = {};

db.sequelize = sequelize;

db.Board = Board;
db.User = User;
db.Post = Post;

// model init
Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

// association(관계 생성)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
