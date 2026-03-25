const data = {
    users: [{
    "userid": "u1",
    "username": "Ali",
    "email": "a@gmail.com",
    "password": "123",
    "profilePicture": "",
    "followed": [],
    "date": "Mar/25/2026 14:54"
    }],
    posts: [],
    currentUser: "u1",
    profileUser: null
}

export function saveData(thisData){
    localStorage.setItem("WebData", JSON.stringify(thisData));
}


export function getData(){
    return JSON.parse(localStorage.getItem("WebData"));
}


saveData(data);

if (getData()==null) {
    saveData(data);
}


// TESTING...
// console.log(getData());