import { saveData, getData } from "./storage.js"; //importing functions from storage.js
// import { User } from "./user.js";

class Interaction{
    content = "";
    authorID;
    likes = [];
    date;
    
    constructor(author, content){

        if (new.target === Interaction) {
            throw new Error("Cannot instantiate abstract class Interaction directly.");
        }   

        this.authorID = author.userid;
        this.content = content;
        this.date = new Date(); 
    }

    get likeNum(){
        return this.likes.length;
    }

    ToggleLike(){ 
        const data = getData();
        const currentUser = data["currentUser"]
        let interactor;

        // is there a user logged in?
        if (currentUser === null){
            // console.log("Null!!!")
            return;
        }

        // is it comment or post?
        if (this.id[0]=='c') {// if it is a comment we will search using its id and the postID
            interactor = data["posts"].find(p => p.id === this.postID).comments.find(c => c.id === this.id);
        }
        else{// if it is a post we only wearch using its id
            interactor = data["posts"].find(p => p.id === this.id);
        }

        // is it already liked?
        const index = interactor.likes.indexOf(currentUser.userid)
        if (index === -1) { // if not add like
            interactor.likes.push(currentUser.userid);
            
        }
        else { // if so remove loke
            interactor.likes.splice(index, 1);
        }
        
        // save changes
        saveData(data)
    }

}

class Comment extends Interaction {

    postID;
    id;

    constructor(author, post, content){
        super(author, content);
        this.postID = post.id;
        this.id = this.generateID();
        this.addComment();
    }

    addComment(){
        const data = getData();
        data["posts"].find(p => p.id === this.postID).comments.push(this);
        saveData(data);
        
    }
    
    generateID(){ //checks how many comments are in the post and assign an id
        const posts = getData()["posts"];
        const post = posts.find(p => p.id === this.postID);
        return `c${(post.comments.length + 1)}`;
    }

}

class Post extends Interaction{

    id;
    picture = "";
    comments = [];

    generateID(){ //checks how many users are in data and assign an id
        return `p${(getData()["posts"].length + 1)}`;
    }
    
    constructor(author, content){
        super(author, content);
        this.id = this.generateID();
        this.addPost();
    }

    addPost(){
        const data = getData();
        data["posts"].push(this);
        saveData(data);
    }
    
    

}


// TESTING...
// const u1 = new User("Ali","a@gmail.com","123")
// const p1 = new Post(u1,"Hello, I am Ali.")
// const c1 = new Comment(u1,p1,"Hi me :)!") 
// console.log(getData());
// // console.log(c1.postID)

// p1.ToggleLike()
// console.log(getData()["posts"].find(p => p.id === c1.postID));

// p1.ToggleLike()
// console.log(getData()["posts"].find(p => p.id === c1.postID));