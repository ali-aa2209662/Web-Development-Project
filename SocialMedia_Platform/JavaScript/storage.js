const data = {
  users: [{userid:1, name:"aaa"}],
  posts: [],
  currentUser: null
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

console.log(getData());