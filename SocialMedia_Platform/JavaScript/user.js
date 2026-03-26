import { saveData, getData } from "./storage.js"; //importing functions from storage.js

export class User{
    
    userid;
    username;
    email;
    password;
    profilePicture = "assets/PFP_Blank.jpg";
    bio = "";
    followers = [];
    following = [];
    date = null;
    
    constructor(username,email,password,profilePicture,bio){ // creates an instance of user and saves it to data
        this.userid = this.generateID();
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePicture = profilePicture;
        this.bio = bio;
        const tempdate = new Date()
        this.date = tempdate.toString().slice(4,15).split(" ").join("/") + " " + tempdate.toString().slice(16,21);
        this.addUser();
    }

    addUser(){
        // console.log(getData());
        const data = getData();
        data["users"].push(this);
        saveData(data);
        // console.log(getData());
    }

    generateID(){ //checks how many users are in data and assign an id
        return `u${(getData()["users"].length + 1)}`;
    }

    static fromData(data) {
        const user = Object.create(User.prototype);
        return Object.assign(user, data);
        }

    

}
export function getProfileUser(){
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get("id");
    return getUserByID(userID);
}

export function createUser(username, email, password){
    new User(username, email, password)
}

export function getUsers(){
    return getData()["users"].map(User.fromData);
}

export function getUserByID(id){ // returns user from 'id' (if 'id' is not found it returns null)
    const u = getUsers().find(u => u.userid === id);
    return (u === undefined)?null:u;
}

export function saveUser(updateUser){
    const data = getData();
    const user = data["users"].find(u => u.userid === updateUser.userid);
    if (user !== undefined) {// if user is found then save data
        user = updateUser;
        saveData(data);
    }
}

export function getCurrentUser(){
    return getUserByID(getData()['currentUser']) || null;
}

export function savePFP(PFP_Base64){
    getUserByID(getCurrentUser()).profilePicture = PFP_Base64;
}

export function setProfileUser(userid){
    const data = getData();
    data["profileUser"] = userid;
    saveData(data);

}

export function getProfileUser(){
    return getData()["profileUser"]
}

export function goToProfile(userid){
    const data = getData();
    data.profileUser = userid;
    saveData(data);
    window.location.href = "profile.html";
}

export function logout(){
    const data = getData();
    data.currentUser = null;
    saveData(data);
    window.location.href = "login.html";
}



// TESTING...
// console.log(getUsers());
// console.log(getUserByID("u1"));
// console.log(getCurrentUser());


// TESTING...
const u1 = new User("Ali","ali@gmail.com","123");
// console.log(user.getUserByID(1));

// const u2 = new user("Ahmed","gmail",'222')

// for (const u of ["Ali","Ahmed","Abdulla","Abdulaziz"]) {
//     new user(u,'gmail',"111")
// }

// const users = getData()["users"]
// users.push(u1)
// console.log(users)
// console.log(u1)
// console.log(new Date());