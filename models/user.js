const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      isUnique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    user_key: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8]
      }
    }
  });

  User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.user_key);
  };

  User.associate = function(models) {
    User.hasMany(models.Movie, {
      foreignKey: "user_id",
      onDelete: "cascade"
    });
  };

  return User;
};
