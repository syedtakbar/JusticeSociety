module.exports = function(sequelize, DataTypes) {
  const Review = sequelize.define("Review", {
    watch_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reivew_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    user_rating: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    }
  });

  Review.associate = function(models) {
    Review.belongsTo(models.Movie, {
      foreignKey: "movie_id",
      allowNull: false
    });
  };

  return Review;
};
