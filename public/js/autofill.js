let autofill = document.getElementById("autofill");

autofill.addEventListener("click", function() {
  let movie = document.getElementById("inputMovieTitle").value;
  const movies = [];
  movies.push(movie);
  console.log(movies);
  for (let i = 0; i < movies.length; i++) {
    const queryURL = "/movie/omdb/" + movies[i];

    // const movieDiv = document.getElementById("movieOutput");
    // movieDiv.innerHTML = "Title: " + movies[i];
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        //logging response
        console.log(responseJson);

        //Budget input
        const inputBudget = document.getElementById("inputBudget");
        inputBudget.value = responseJson.BoxOffice;

        //Release input
        const inputRelease = document.getElementById("inputRelease");
        inputRelease.value = responseJson.Released;

        //genre input
        const inputGenre = document.getElementById("inputGenre");
        inputGenre.value = responseJson.Genre;

        //Ratings input
        const inputRatings = document.getElementById("inputRatings");
        inputRatings.value = responseJson.Ratings[0].Value;

        //Rotten tomatoes input
        const inputRottenTomatoes = document.getElementById(
          "inputRotten_tomatoes"
        );
        inputRottenTomatoes.value = responseJson.Ratings[1].Value;

        //imdb link
        const inputImdblink = document.getElementById("inputImdb_link");
        inputImdblink.value = responseJson.Poster;

        //plot input
        const inputMoviePlot = document.getElementById("inputMoviePlot");
        inputMoviePlot.value = responseJson.Plot;

        //actors
        const inputActor = document.getElementById("inputActor");
        inputActor.value = responseJson.Actors;

        //countries
        const inputCountry = document.getElementById("inputCountry");
        inputCountry.value = responseJson.Country;

        //directors
        const inputDirector = document.getElementById("inputDirector");
        inputDirector.value = responseJson.Director;

        //awards
        const inputAwards = document.getElementById("inputAwards");
        inputAwards.value = responseJson.Awards;
      });
  }
});
