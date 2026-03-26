const data = {
    users: [{
    "userid": "u1",
    "username": "Ali",
    "email": "a@gmail.com",
    "password": "Aa123123",
    "profilePicture": "",
    "bio": "",
    "followers": [],
    "following": [],
    "date": "Mar/25/2026 14:54"
    }],
    posts: [],
    currentUser: "u1",
    profileUser: "u1"
}

export function saveData(thisData){
    localStorage.setItem("WebData", JSON.stringify(thisData));
}


export function getData(){
    const raw = localStorage.getItem("WebData");
    if (raw == null) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}


saveData(data);

if (getData()==null) {
    saveData(data);
}


// TESTING...
console.log(getData());