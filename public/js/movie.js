console.log("movie.js loaded");

const MovieAPI = {
  addMovie: function(moviedata) {
    return fetch("/movie", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(moviedata)
    }).then(res => res.json());
  }
};

const inputTitle = document.getElementById("inputMovieTitle");
const inputImdb_link = document.getElementById("inputImdb_link");
const inputBudget = document.getElementById("inputBudget");
const inputRelease = document.getElementById("inputRelease");
const inputGenre = document.getElementById("inputGenre");
const inputRatings = document.getElementById("inputRatings");
const inputRotten_tomatoes = document.getElementById("inputRotten_tomatoes");
const inputMoviePlot = document.getElementById("inputMoviePlot");
const inputActor = document.getElementById("inputActor");
const inputDirector = document.getElementById("inputDirector");
const inputAwards = document.getElementById("inputAwards");
const inputCountry = document.getElementById("inputCountry");

const saveMovieBtn = document.getElementById("save-movie");

const movieerrormsgsection = document.getElementById("movie-err-msg");

const saveMovie = function(event) {
  event.preventDefault();

  const newMovie = {
    title: inputTitle.value.trim(),
    budget: inputBudget.value.trim(),
    release_date: inputRelease.value.trim(),
    genre: inputGenre.value.trim(),
    ratings: inputRatings.value.trim(),
    rotten_tomatoes: inputRotten_tomatoes.value.trim(),
    plot: inputMoviePlot.value.trim(),
    imdb_link: inputImdb_link.value.trim(),
    actor: inputActor.value.trim(),
    director: inputDirector.value.trim(),
    awards: inputAwards.value.trim(),
    country: inputCountry.value.trim()
  };

  if (
    newMovie.title.length <= 0 ||
    newMovie.plot.length <= 0 ||
    newMovie.budget.length <= 0 ||
    newMovie.genre.length <= 0 ||
    newMovie.release_date.length <= 0 ||
    newMovie.rotten_tomatoes.length <= 0 ||
    newMovie.imdb_link.length <= 0 ||
    newMovie.actor.length <= 0 ||
    newMovie.director.length <= 0 ||
    newMovie.country.length <= 0 ||
    newMovie.awards.length <= 0 ||
    newMovie.ratings.length <= 0
  ) {
    movieerrormsgsection.innerText = "**Please fill out entire form**";
  } else {
    console.log("adding movie!!!");
    MovieAPI.addMovie(newMovie).then(function() {
      console.log("done adding movie!!!");
      window.location.href = "/movies";
    });
  }
};

if (saveMovieBtn) saveMovieBtn.addEventListener("click", saveMovie);
