console.log("home.js loaded");

const LOGINAPI = {
  login: function(userdata) {
    return fetch("/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userdata)
    }).then(res => res.json());
  }
};

const signinmodalbtn = document.getElementById("sign-in-modal");
const signinbtn = document.getElementById("sign-in");
// Convert searchBtn to display user list of saved movies? Or make default view VVV
const viewBtn = document.getElementById("view-movies");
const searchBtn = document.getElementById("search-movie");
const maintUserBtn = document.getElementById("maintain-user");
const addMovieBtn = document.getElementById("add-movie");
const postReviewBtn = document.getElementById("post-review");
const signupbtn = document.getElementById("sign-up");
const gohomebtn = document.getElementById("go-home");
const userinfomodal = document.getElementById("user-info");
const searchModalbtn = document.getElementById("search-info");
const signinclosebtn = document.getElementById("sign-in-close");
const searchclosebtn = document.getElementById("search-close");
const signinXbtn = document.getElementById("sign-in-x");
const searchXbtn = document.getElementById("search-x");

const email = document.getElementById("email");
const userpassword = document.getElementById("user_password");

const signinmodal = function(event) {
  event.preventDefault();
  userinfomodal.style.display = "block";
};

const closemodal = function(event) {
  event.preventDefault();
  userinfomodal.style.display = "none";
};

// Logic for navigating to list view here VVV
const viewSaved = function(event) {
  event.preventDefault();
  window.location.href = "/movies";
};
const searchModal = function(event) {
  event.preventDefault();
  searchModalbtn.style.display = "block";
};

const maintUser = function(event) {
  event.preventDefault();
  window.location.href = "/users/view";
};

const addMovie = function(event) {
  event.preventDefault();
  window.location.href = "/movie/new";
};

const postReview = function(event) {
  event.preventDefault();
  window.location.href = "/review/new";
};

// Remember to delete this once changed
const closeSearchmodal = function(event) {
  event.preventDefault();
  searchModalbtn.style.display = "none";
};

const signup = function(event) {
  event.preventDefault();
  window.location.href = "/signup";
};

const signin = function(event) {
  event.preventDefault();

  const user = {
    email: email.value.trim(),
    user_key: userpassword.value.trim()
  };

  LOGINAPI.login(user).then(function(results) {
    if (results) {
      window.location.href = "/";
    } else {
      userinfomodal.style.display = "none";
    }
  });
};

const gohome = function(event) {
  event.preventDefault();
  window.location.href = "/";
};

if (signinmodalbtn) signinmodalbtn.addEventListener("click", signinmodal);
// See above VVV
if (viewBtn) viewBtn.addEventListener("click", viewSaved);
if (searchBtn) searchBtn.addEventListener("click", searchModal);
if (signupbtn) signupbtn.addEventListener("click", signup);
if (signinbtn) signinbtn.addEventListener("click", signin);
if (gohomebtn) gohomebtn.addEventListener("click", gohome);
if (signinclosebtn) signinclosebtn.addEventListener("click", closemodal);
if (signinXbtn) signinXbtn.addEventListener("click", closemodal);
if (searchclosebtn) searchclosebtn.addEventListener("click", closeSearchmodal);
if (searchXbtn) searchXbtn.addEventListener("click", closeSearchmodal);
if (maintUserBtn) maintUserBtn.addEventListener("click", maintUser);
if (addMovieBtn) addMovieBtn.addEventListener("click", addMovie);
if (postReviewBtn) postReviewBtn.addEventListener("click", postReview);
