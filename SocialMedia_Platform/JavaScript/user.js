import { saveData, getData } from "./storage.js"; //importing functions from storage.js

export class User{
    
    userid;
    username;
    email;
    password;
    profilePicture = "";
    followed = [];
    date = null;
    
    constructor(username,email,password){ // creates an instance of user and saves it to data
        this.userid = this.generateID();
        this.username = username;
        this.email = email;
        this.password = password;
        this.date = new Date();   
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


export function getUsers(){
    return getData()["users"].map(User.fromData);
}

export function getUserByID(id){ // returns user from 'id' (if 'id' is not found it returns null)
    const u = getUsers().find(u => u.userid === id);
    return (u === undefined)?null:u;
}

export function getCurrentUser(){
    return getData()['currentUser'];
}

// TESTING...
// const u1 = new user("Ali","ali@gmail.com","123");
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