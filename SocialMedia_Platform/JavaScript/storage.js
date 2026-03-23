const data = {
  users: [],
  posts: [],
  currentUser: null
}

export function saveData(thisData){
    localStorage.setItem("WebData", JSON.stringify(thisData));
}


export function getData(){
    return JSON.parse(localStorage.getItem("WebData"));
}
// saveData(data);
if (getData()==null) {
    saveData(data);
}


// TESTING...
// console.log(getData());