import { saveData, getData } from "./storage.js"; //importing functions from storage.js
import {User} from "./user.js";

class Interaction{
    content = "";
    authorID;
    likes = [];
    date;
    
    constructor(authorID, content){       

        if (new.target === Interaction) { //
            throw new Error("Cannot instantiate abstract class Interaction directly.");
        }   
        
        this.authorID = authorID;
        this.content = content;
        this.date = new Date(); 
    }

    get likeNum(){
        return this.likes.length;
    }

    ToggleLike(){ 
        const data = getData();
        if (data == null) return;
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
        const index = interactor.likes.indexOf(currentUser)
        if (index === -1) { // if not add like
            interactor.likes.push(currentUser);
            
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

    constructor(authorID, postID, content){
        super(authorID, content);
        this.postID = postID;
        this.id = this.generateID();
        this.addComment();
    }

    addComment(){
        const data = getData();
        if (data == null) return;
        const post = data["posts"].find(p => p.id === this.postID);
        if (!post) return;
        post.comments.push(this);
        saveData(data);
        
    }
    
    generateID(){ //checks how many comments are in the post and assign an id
        const posts = getData()["posts"];
        const post = posts.find(p => p.id === this.postID);
        return `c${(post.comments.length + 1)}`;
    }

    static fromData(data) {
        const comment = Object.create(Comment.prototype);
        return Object.assign(comment, data);
        }

}

class Post extends Interaction{

    id;
    picture = "";
    comments = [];

    generateID(){ //checks how many users are in data and assign an id
        return `p${(getData()["posts"].length + 1)}`;
    }
    
    constructor(authorID, content){
        super(authorID, content);
        this.id = this.generateID();
        this.addPost();
    }

    addPost(){
        const data = getData();
        if (data == null) return;
        data["posts"].push(this);
        saveData(data);
    }
    
    static fromData(data) {
        const post = Object.create(Post.prototype);
        const assigned = Object.assign(post, data);
        assigned.comments = (data.comments ?? []).map(Comment.fromData);
        return assigned;
        }

    

}

export function getPosts(){
    const data = getData();
    if (data == null || !Array.isArray(data.posts)) return [];
    return data.posts.map(Post.fromData);
}

export function getPostsByUserID(userid){
    return getPosts().filter(p => p.authorID == userid);
}

export function getPostByID(postID){
    
    return getPosts().find(p => p.id === postID);
}

export function createPost(authorID, content){
    const data = getData();
    if (data == null) return;
    new Post(authorID, content)
}

export function createComment(authorID, postID, content){
    const data = getData();
    if (data == null) return;
    new Comment(authorID, postID, content);
}




// TESTING... (disabled)
// const u1 = new User("Ali","a@gmail.com","123")
// const p1 = new Post(u1.userid,"Hello, I am Ali.")
// const c1 = new Comment(u1.userid,p1.id,"Hi me :)!") 


//
// console.log(getUserByID("u1"));
// console.log(getPosts())
//
// console.log(getData());