const data = {
  users: [],
  posts: [],
  currentUser: null
}

class post{
    content = ""
    likes = [];
    author;

    constructor(author, content){
        this.author = author;
        this.content = content;
        this.addPost();
    }

    addPost(PA){

        data["posts"].push(this);
        this.author.posts.push(this);
                
    }
    
    ToggleLike(){
        const currentUser = data["currentUser"];
        if (currentUser === null){
            return;
        }

        const index = this.likes.indexOf(currentUser.userid)
        if (index === -1) {
            this.likes.push(currentUser.userid);
            
        }
        else {
            this.likes.splice(index, 1);
        }
    }
}

class user{
    name = "";
    posts = [];

    constructor(name){
        this.name = name;
        this.addUser();
    }

    addUser(){
            
        data["users"].push(this);
        
        
    }

}

// const u1 = new user("Ali","a@gmail.com","123");
// const p1 = new post(u1,"Hello, I am Ali.");
// p1.ToggleLike()
// console.log(data["posts"]);
// p1.ToggleLike()
// console.log(data["posts"]);

console.log("p1"+"c1")