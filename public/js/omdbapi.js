let searchRun = document.getElementById("searchBtn");

searchRun.addEventListener("click", function() {
  let movie = document.getElementById("input").value;
  const newMovie = movie.toUpperCase();
  console.log("Title: " + newMovie);
  const movies = [];
  movies.push(newMovie);
  console.log(movies);
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
        console.log(responseJson);

        //released
        const releasedDiv = document.createElement("div");
        releasedDiv.innerHTML = "Released: " + responseJson.Released;
        movieDiv.append(releasedDiv);
        console.log(responseJson.Released);

        //rating
        const ratingDiv = document.createElement("div");
        ratingDiv.innerHTML = "Rated: " + responseJson.Rated;
        movieDiv.append(ratingDiv);
        console.log(responseJson.Rated);

        //actors
        const actorsDiv = document.createElement("div");
        actorsDiv.innerHTML = "Actors: " + responseJson.Actors;
        movieDiv.append(actorsDiv);
        console.log(responseJson.Actors);

        //plot
        const plotDiv = document.createElement("div");
        plotDiv.innerHTML = "Plot: " + responseJson.Plot;
        movieDiv.append(plotDiv);
        console.log(responseJson.Plot);

        //genre
        const genreDiv = document.createElement("div");
        genreDiv.innerHTML = "Genre: " + responseJson.Genre;
        movieDiv.append(genreDiv);
        console.log(responseJson.Genre);

        //directors
        const directorsDiv = document.createElement("div");
        directorsDiv.innerHTML = "Directors: " + responseJson.Director;
        movieDiv.append(directorsDiv);
        console.log(responseJson.Director);

        //awards
        const awardsDiv = document.createElement("div");
        awardsDiv.innerHTML = "Awards: " + responseJson.Awards;
        movieDiv.append(awardsDiv);
        console.log(responseJson.Awards);

        //countries
        const countryDiv = document.createElement("div");
        countryDiv.innerHTML = "Country: " + responseJson.Country;
        movieDiv.append(countryDiv);
        console.log(responseJson.Country);
      });
  }
});
