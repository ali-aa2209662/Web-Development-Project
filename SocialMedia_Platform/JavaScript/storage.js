const data = {
    users: [{
        bio
: 
"",
date
: 
"Apr/22/2026 00:30",
email
: 
"k@gmail.com",
followers
: 
[],
following
: 
[],
password
: 
"Kd123123",
profilePicture
: 
"assets/PFP_Blank.jpg",
userid
: 
"u1",
username
: 
"Khalid"
    },{
bio
: 
"",
date
: 
"Apr/22/2026 00:30",
email
: 
"A@gmail.com",
followers
: 
[],
following
: 
[],
password
: 
"Aj123123",
profilePicture
: 
"assets/PFP_Blank.jpg",
userid
: 
"u2",
username
: 
"Ali" 
    }],
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
console.log(getData());