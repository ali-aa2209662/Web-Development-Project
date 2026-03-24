import { getUsers } from "./user.js";

console.log("loaded auth");

function login(username, password) {
  const users = getUsers(); // better to call it here (fresh data)

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid username or password" };
  }

  return { success: true, message: "Login successful", user };
}
export { login };

import { getUsers, saveUsers } from "./user.js";

function signup(username, email, password) {
  const users = getUsers();

  //Check if username already exists
  const usernameTaken = users.some(u => u.username === username);
  if (usernameTaken) {
    return { success: false, message: "Username already exists" };
  }

  // 🔍 Check if email already exists
  const emailTaken = users.some(u => u.email === email);
  if (emailTaken) {
    return { success: false, message: "Email already in use" };
  }}
