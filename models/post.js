const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        codeName: {
          type: Sequelize.STRING(100),
        },
        guName: {
          type: Sequelize.STRING(100),
        },
        title: {
          type: Sequelize.STRING(100),
        },
        date: {
          type: Sequelize.STRING(100),
        },
        place: {
          type: Sequelize.STRING(100),
        },
        useFee: {
          type: Sequelize.INTEGER,
        },
        startDate: {
          type: Sequelize.STRING(100),
        },
        endDate: {
          type: Sequelize.STRING(100),
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
    db.Post.belongsTo(db.Board, {
      foreignKey: { name: "boardId", onDelete: "SET NULL", as: "Board" },
    });
    db.Post.belongsTo(db.User, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "User" },
    });
  }

  static includeAttributes = ["id", "title", "userId", "createdAt"];
};
