console.log("Home.js loaded");

const LOGINAPI = {
  login: function(userdata) {
    return fetch("/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userdata)
    }).then(res => res.json());
  },
  viewUser: function() {
    return fetch("/users/view").then(res => res.json());
  }
};

const signinmodalbtn = document.getElementById("sign-in-modal");
const signinbtn = document.getElementById("sign-in");
const signupbtn = document.getElementById("sign-up");
const gohomebtn = document.getElementById("go-home");
const userinfomodal = document.getElementById("user-info");
const signinclosebtn = document.getElementById("sign-in-close");
const signinXbtn = document.getElementById("sign-in-x");

const email = document.getElementById("email");
const userpassword = document.getElementById("user_password");

const signinmodal = function(event) {
  event.preventDefault();
  // userinfomodal.modal() ;
  userinfomodal.style.display = "block";
};

const closemodal = function(event) {
  event.preventDefault();
  // userinfomodal.modal() ;
  userinfomodal.style.display = "none";
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
      LOGINAPI.viewUser();
    } else {
      userinfomodal.style.display = "none";
      alert("oops something went wrong, please try again!");
    }
  });
};

const gohome = function(event) {
  event.preventDefault();
  window.location.href = "/";
};

if (signinmodalbtn) signinmodalbtn.addEventListener("click", signinmodal);
if (signupbtn) signupbtn.addEventListener("click", signup);
if (signinbtn) signinbtn.addEventListener("click", signin);
if (gohomebtn) gohomebtn.addEventListener("click", gohome);
if (signinclosebtn) signinclosebtn.addEventListener("click", closemodal);
if (signinXbtn) signinXbtn.addEventListener("click", closemodal);
