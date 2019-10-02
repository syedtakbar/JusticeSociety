console.log("user.js loaded");

const API = {
  addUser: function(userdata) {
    return fetch("/signup", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userdata)
    }).then(res => res.json());
  },
  updateUser: function(userdata) {
    return fetch("/users/" + userdata.email, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(userdata)
    }).then(res => res.json());
  },
  deleteUser: function(userdata) {
    return fetch("/users/" + userdata.email, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify(userdata)
    }).then(res => res.json());
  }
};

const accountNumber = document.getElementById("account-number");
const inputFirst = document.getElementById("inputFirst");
const inputLast = document.getElementById("inputLast");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const adduserbtn = document.getElementById("add-user");
const updateuserbtn = document.getElementById("update-user");
const deleteuserbtn = document.getElementById("delete-user");
const errormsgsection = document.getElementById("create-err-msg");

const adduser = function(event) {
  event.preventDefault();

  const newUser = {
    first_name: inputFirst.value.trim(),
    last_name: inputLast.value.trim(),
    email: inputEmail.value.trim(),
    user_key: inputPassword.value.trim()
  };

  if (
    newUser.user_key.length <= 0 ||
    newUser.email.length <= 0 ||
    newUser.last_name.length <= 0 ||
    newUser.first_name.length <= 0
  ) {
    errormsgsection.innerText = "**Please fill out entire form**";
  } else {
    API.addUser(newUser).then(function() {
      window.location.href = "/";
    });
  }
};

const updateuser = function(event) {
  event.preventDefault();

  const updatedUser = {
    first_name: inputFirst.value.trim(),
    last_name: inputLast.value.trim(),
    email: accountNumber.getAttribute("data-accountemail"),
    user_key: inputPassword.value.trim()
  };

  if (
    updatedUser.user_key.length <= 0 &&
    updatedUser.email.length <= 0 &&
    updatedUser.last_name.length <= 0 &&
    updatedUser.first_name.length <= 0
  ) {
    errormsgsection.innerText("**Please fill out entire form**");
  } else {
    API.updateUser(updatedUser).then(function(res) {
      window.location.href = "/";
    });
  }
};

const deleteuser = function(event) {
  event.preventDefault();
  const deleteUser = {
    email: accountNumber.getAttribute("data-accountemail"),
    user_key: inputPassword.value.trim()
  };

  if (deleteUser.user_key.length <= 0 && deleteUser.email.length <= 0) {
    errormsgsection.innerText("**Please fill out entire form**");
  } else {
    API.deleteUser(deleteUser).then(function() {
      window.location.href = "/logout";
    });
  }
};

if (adduserbtn) adduserbtn.addEventListener("click", adduser);
if (updateuserbtn) updateuserbtn.addEventListener("click", updateuser);
if (deleteuserbtn) deleteuserbtn.addEventListener("click", deleteuser);
