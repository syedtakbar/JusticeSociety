module.exports = function(sequelize, DataTypes) {
  const Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60]
      }
    },
    plot: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    ratings: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false
    },
    rotten_tomatoes: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    imdb_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  });

  Movie.associate = function(models) {
    Movie.belongsTo(models.User, {
      foreignKey: "user_id",
      allowNull: false
    });
  };

  Movie.associate = function(models) {
    Movie.hasMany(models.Review, {
      foreignKey: "movie_id",
      onDelete: "cascade"
    });
  };
  return Movie;
};
