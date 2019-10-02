console.log("review.js loaded");

const ReviewAPI = {
  addReview: function(reviewData) {
    return fetch("/review", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(reviewData)
    }).then(res => res.json());
  },
  getMovies: function() {
    return fetch("/movies/for-review").then(res => res.json());
  }
};

const selectmovie = document.getElementById("select-movie");
const inputReviewBody = document.getElementById("inputReviewBody");
const inputUser_rating = document.getElementById("inputUser_rating");
const inputWatch_date = document.getElementById("inputWatch_date");

const saveReveiwBtn = document.getElementById("save-review");

const reviewrrormsgsection = document.getElementById("review-err-msg");

if (selectmovie) {
  (function loadMoviesDropDown() {
    ReviewAPI.getMovies().then(function(data) {
      data.forEach(dataitem => {
        const movieOpt = document.createElement("option");
        movieOpt.text = dataitem.title;
        movieOpt.value = dataitem.id;
        selectmovie.add(movieOpt);
      });
    });
  })();
}

const saveReview = function(event) {
  event.preventDefault();

  const newReview = {
    reivew_body: inputReviewBody.value.trim(),
    user_rating: inputUser_rating.value.trim(),
    watch_date: inputWatch_date.value.trim(),
    movie_id: selectmovie.value.trim()
  };

  if (
    newReview.reivew_body.length <= 0 ||
    newReview.user_rating.length <= 0 ||
    newReview.watch_date.length <= 0 ||
    newReview.movie_id.length <= 0
  ) {
    reviewrrormsgsection.innerText = "**Please fill out entire form**";
  } else {
    console.log("adding review for movie id: " + newReview.movie_id);
    ReviewAPI.addReview(newReview).then(function() {
      console.log("done adding review!!!");
      window.location.href = "/movies";
    });
  }
};

if (saveReveiwBtn) saveReveiwBtn.addEventListener("click", saveReview);
