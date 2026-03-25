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
  currentUser: "u1"
}

export function saveData(thisData){
    localStorage.setItem("WebData", JSON.stringify(thisData));
}


export function getData(){
    return JSON.parse(localStorage.getItem("WebData"));
}

export function saveImage(file){
    app.post("/upload", (req, res) => {
        const file = req.files.image;

        const path = "assets/profile-pictures/" + file.name;

        file.mv(path); // save file

        res.json({ path: path });
    });
}

saveData(data);

if (getData()==null) {
    saveData(data);
}


// TESTING...
// console.log(getData());