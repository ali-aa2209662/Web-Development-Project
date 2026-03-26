const data = {
    users: [],
    posts: [],
    currentUser: null,
    profileUser: null
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


// saveData(data);

if (getData()==null) {
    saveData(data);
}


// TESTING...
// console.log(getData());