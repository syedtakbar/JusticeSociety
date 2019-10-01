const db = require("../models");

module.exports = function(app, passport) {
  app.post("/review", function(req, res) {
    db.Review.create(req.body).then(function(dbReviews) {
      res.json(dbReviews);
    });
  });
};
