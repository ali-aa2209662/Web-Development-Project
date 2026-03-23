const data = {
  users: [
    {
      id: 1,
      username: "Aziz_Abarah",
      password: "123Aa123",
      bio: "Just a regular guy who loves coding and coffee.",
      followers: [1000000000],
      following: [2]
    },
    {
      id: 2,
      username: "Ali_Almarri",
      password: "123",
      bio: "Software engineer and coffee enthusiast.",
      followers: [1000],
      following: [1]
    },
    {
      id: 3,
      username: "Ahmed_Seboui",
      password: "123",
      bio: "hardware engineer and coffee enthusiast.",
      followers: [5000],
      following: [1]
    },
    {
      id: 4,
      username: "Abdullah_Sultan",
      password: "123",
      bio: "programmer engineer and coffee hater.",
      followers: [10],
      following: [1]
    }  
  ],
  posts: [
    {
      id: 1,
      userId: 1,
      content: "Hello world! This is my first post.",
      timestamp: "2024-06-01 10:00:00"
    },
    {
      id: 2,
      userId: 2,
      content: "Just had a great cup of coffee!",
      timestamp: "2024-06-01 11:00:00"
    },
    {
      id: 3,
      userId: 1,
      content: "Working on a new project, stay tuned!",
      timestamp: "2024-06-02 09:30:00"
    },
    {
      id: 4,
      userId: 3,
      content: "Hardware is the backbone of technology.",
      timestamp: "2024-06-02 14:45:00"
    },
    {
      id: 5,
      userId: 4,
      content: "I prefer tea over coffee any day.",
      timestamp: "2024-06-03 08:20:00"
    }
  ],
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


// TESTING...
console.log(getData());