const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        codename: {
          type: Sequelize.STRING(50),
        },
        guname: {
          type: Sequelize.STRING(50),
        },
      },
      {
        sequelize,
        // tableName: 'tableName', // table명을 수동으로 생성 함
        // freezeTableName: true, // true: table명의 복수형 변환을 막음
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.User, {
      foreignKey: { name: "userid", onDelete: "SET NULL", as: "Users" },
    });
    db.Board.hasMany(db.Post, {
      foreignKey: {
        name: "boarsdid",
        onDelete: "SET NULL",
        as: "Posts",
      },
    });
  }
  static includeAttributes = ["id", "codename", "guname", "createdAt"];
};
