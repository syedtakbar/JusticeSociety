let searchRun = document.getElementById("searchBtn");

searchRun.addEventListener("click", function() {
  let movie = document.getElementById("input").value;
  const newMovie = movie.toUpperCase();
  const movies = [];
  movies.push(newMovie);
  for (let i = 0; i < movies.length; i++) {
    const queryURL = "/movie/omdb/" + movies[i];
    const movieDiv = document.getElementById("movieOutput");
    movieDiv.innerHTML = "Title: " + movies[i];
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        //logging response

        //released
        const releasedDiv = document.createElement("div");
        releasedDiv.innerHTML = "Released: " + responseJson.Released;
        movieDiv.append(releasedDiv);

        //rating
        const ratingDiv = document.createElement("div");
        ratingDiv.innerHTML = "Rated: " + responseJson.Rated;
        movieDiv.append(ratingDiv);

        //actors
        const actorsDiv = document.createElement("div");
        actorsDiv.innerHTML = "Actors: " + responseJson.Actors;
        movieDiv.append(actorsDiv);

        //plot
        const plotDiv = document.createElement("div");
        plotDiv.innerHTML = "Plot: " + responseJson.Plot;
        movieDiv.append(plotDiv);

        //genre
        const genreDiv = document.createElement("div");
        genreDiv.innerHTML = "Genre: " + responseJson.Genre;
        movieDiv.append(genreDiv);

        //directors
        const directorsDiv = document.createElement("div");
        directorsDiv.innerHTML = "Directors: " + responseJson.Director;
        movieDiv.append(directorsDiv);

        //awards
        const awardsDiv = document.createElement("div");
        awardsDiv.innerHTML = "Awards: " + responseJson.Awards;
        movieDiv.append(awardsDiv);

        //countries
        const countryDiv = document.createElement("div");
        countryDiv.innerHTML = "Country: " + responseJson.Country;
        movieDiv.append(countryDiv);
      });
  }
});
