import { getData, saveData} from "./storage.js"
import { getUsers, createUser, setCurrentUser, getCurrentUser } from "./user.js";

console.log("loaded auth");
console.log(getCurrentUser())

export function checkLogin(){// might make in phase 2

}

export function login(username, password) {
  console.log(username)
  console.log(password)
  const users = getUsers(); // better to call it here (fresh data)

  const user = users.find(
    u => u.username === username && u.password === password
  );
  console.log(user)
  if (!user) {
    return { success: false, message: "Invalid username or password" };
  }
  console.log("PPPPPPPPPPPPPPPHHHH")
  setCurrentUser(user.userid)
  window.location.href = "home.html";


  }

export function signup(username, email, password) {

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
    }

    // adds new user to data
    createUser(username, email, password);

    };

export function logout(){
  setCurrentUser(null);
  window.location.href = "login.html";
}

// add an event listener for the sumbit button for sign up
// and make sure if all the information is correct to take 
// the user to the login page after they submit