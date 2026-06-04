import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// SIGN UP
window.signup = function(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth,email,password)
  .then(()=> alert("Account created"))
  .catch(err=> alert(err.message));
}

// LOGIN
window.login = function(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth,email,password)
  .then(()=> window.location.href="dashboard.html")
  .catch(err=> alert(err.message));
}

// LOGOUT
window.logout = function(){
  signOut(auth).then(()=> window.location.href="index.html");
}
