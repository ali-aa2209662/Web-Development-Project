import { setCurrentUser, getCurrentUser } from "./user.js";

// console.log("loaded auth");
// console.log(getCurrentUser())

export function checkLogin() {// might make in phase 2
  if (getCurrentUser() === null) logout(); //checks if user is logged in
}

export async function login(username, password) {
  // console.log(username)
  // console.log(password)
  const response = await fetch('/api/users');
  const users = await response.json();
  const user = users.find(u => u.username === username && u.password === password);
  // console.log(user)
  if (!user) {
    return false; // login failed
  }
  setCurrentUser(user.id);
  window.location.href = "home.html";
  return true;
}
//Here fetching for the signup: 
export async function signup(username, email, password) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  const result = await response.json();
  if (response.ok) {
    return { success: true };
  }
  return { success: false, message: result.error };
}

export function logout() {
  setCurrentUser(null);
  window.location.href = "login.html";
}

// add an event listener for the sumbit button for sign up
// and make sure if all the information is correct to take
// the user to the login page after they submit
