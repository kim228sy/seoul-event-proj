const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        departmentId: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(100),
        },
        userid: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING(20),
        },
        email: {
          type: Sequelize.STRING(255),
        },
        phone: {
          type: Sequelize.STRING(255),
        },
        updatedPwDate: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        underscored: true, // true: underscored, false: camelCase
        timestamps: true, // createAt, updatedAt
        paranoid: true, // deletedAt
      }
    );
  }

  static associate(db) {
    db.User.belongsTo(db.Department, {
      foreignKey: {
        name: "departmentId",
        onDelete: "SET NULL",
        as: "Department",
      },
    });
    db.User.hasMany(db.Board, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "Boards" },
    });
    db.User.hasMany(db.Post, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "Posts" },
    });
    db.User.hasMany(db.Comment, {
      foreignKey: { name: "userId", onDelete: "SET NULL", as: "Comments" },
    });
  }

  static includeAttributes = ["id", "name", "role", "email", "phone"];
};
