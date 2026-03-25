const data = {
  users: [{
    "userid": "u1",
    "username": "Ali",
    "email": "a@gmail.com",
    "password": "123",
    "profilePicture": "",
    "followed": [],
    "date": "2026-03-24T11:34:57.120Z"
}],
  posts: [],
  currentUser: {
    "userid": "u1",
    "username": "Ali",
    "email": "a@gmail.com",
    "password": "123",
    "profilePicture": "",
    "followed": [],
    "date": "2026-03-24T11:34:57.120Z"
}
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