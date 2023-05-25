const { sequelize } = require("./connection");
const Pars = require("./Pars");

const db = {};

db.sequelize = sequelize;

// model 생성
db.Pars = Pars;

// model init
Department.init(sequelize);

module.exports = db;
