let autofill = document.getElementById("autofill");
const apikey1 = "79b57024";
//const apikey1 = process.env.OMDB_KEY;

autofill.addEventListener("click", function() {
  let movie = document.getElementById("inputMovieTitle").value;
  const movies = [];
  movies.push(movie);
  console.log(movies);
  for (let i = 0; i < movies.length; i++) {
    const queryURL =
      "https://www.omdbapi.com/?apikey=" + apikey1 + "&t=" + movies[i];

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
        inputBudget.placeholder = responseJson.BoxOffice;

        //Release input
        const inputRelease = document.getElementById("inputRelease");
        inputRelease.placeholder = responseJson.Released;

        //genre input
        const inputGenre = document.getElementById("inputGenre");
        inputGenre.placeholder = responseJson.Genre;

        //Ratings input
        const inputRatings = document.getElementById("inputRatings");
        inputRatings.placeholder = responseJson.Rated;

        //Rotten tomatoes input
        const inputRottenTomatoes = document.getElementById(
          "inputRotten_tomatoes"
        );
        inputRottenTomatoes.placeholder = responseJson.Ratings[1].Value;

        //imdb link
        const inputImdblink = document.getElementById("inputImdb_link");
        inputImdblink.placeholder = responseJson.Poster;

        //plot input
        const inputMoviePlot = document.getElementById("inputMoviePlot");
        inputMoviePlot.value = responseJson.Plot;
      });
  }
});
