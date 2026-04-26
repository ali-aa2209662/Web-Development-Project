import { getPosts, createPost, createComment, deleteComment, deletePost } from "./post.js";
import { getUserByID, getCurrentUser, setProfileUser, getUsers } from "./user.js";
import { logout } from "./auth.js";

// console.log(getPosts());
// checkLogin();



addEventListener("DOMContentLoaded", () => {

    // makes searchbar empty
    document.querySelector('#search-users').innerHTML = ""

    if (getCurrentUser() == null) document.querySelector("#logoutBtn").innerHTML = "Login";

    const createPostForm = document.getElementById("createPostForm");
    initProfileButton()
    initLogoutButton()
    createPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = document.getElementById("postContent").value;
        createNewPost(content);
        createPostForm.reset();
    });
});

addEventListener("click", (e) => {
    let likeBtn = null;
    if (e.target.classList && e.target.classList.contains("like-btn")) {
        likeBtn = e.target;
    } else if (e.target.parentElement && e.target.parentElement.classList && e.target.parentElement.classList.contains("like-btn")) {
        likeBtn = e.target.parentElement;
    }
    if (likeBtn !== null) {
        const id = likeBtn.getAttribute("data-id");
        const postID = likeBtn.getAttribute("data-postID");
        if (!id) return;
        handleLike(id, postID);
        displayPosts();
    }
});

addEventListener("click", (e) => {
    let DeleteBtn = null;
    if (e.target.classList && e.target.classList.contains("delete-btn")) {
        DeleteBtn = e.target;
    } else if (e.target.parentElement && e.target.parentElement.classList && e.target.parentElement.classList.contains("delete-btn")) {
        DeleteBtn = e.target.parentElement;
    }
    if (DeleteBtn !== null) {
        const id = DeleteBtn.getAttribute("data-id");
        const postID = DeleteBtn.getAttribute("data-postID");
        if (!id) return;
        if (confirm(`Are you sure you want to delete this ${(!!postID) ? "comment" : "post"}`)) {
            if (!!postID) deleteComment(postID, id);
            else deletePost(id);
        }
        displayPosts();
    }
});

addEventListener("click", (e) => {
    let commentBtn = null;
    if (e.target.classList && e.target.classList.contains("comment-btn")) {
        commentBtn = e.target;
    } else if (e.target.parentElement && e.target.parentElement.classList && e.target.parentElement.classList.contains("comment-btn")) {
        commentBtn = e.target.parentElement;
    }

    if (commentBtn !== null) {

        const postID = commentBtn.getAttribute("data-id");
        if (!postID) return;
        const commentForm = document.querySelector(`.comment-form[data-id="${postID}"]`);
        if (commentForm) commentForm.style.display = "block";

        const commentInput = document.querySelector(`.comment-input[data-id="${postID}"]`);
        if (commentInput) commentInput.focus();
    }
});

addEventListener("click", (e) => {
    let authorName = null;
    if (e.target && e.target.id == "author_name") {
        authorName = e.target;
    }
    if (authorName !== null) {
        setProfileUser(e.target.dataset.id);
    }
});

document.querySelector('#search-bar').addEventListener("keyup", (e) => {
    const searchbar = e.target.value.trim()

    if (!!searchbar) {
        initSearchBar(searchbar);
        initFollowButton();
    } else {
        document.querySelector('#search-users').innerHTML = ""
    }
});

document.querySelector('#search-btn').addEventListener('click', (e) => {
    const currentUser = getUserByID(getCurrentUser());
    const profileUser = getUserByID(e.target.getAttribute('data-id'));
    console.log("CLICK")
    let isFollowing = (profileUser.followers.find(u => u.userid === currentUser.userid) != undefined);
    e.target.textContent = isFollowing ? "Follow" : "Unfollow";
    // console.log(profileUser.followers)
    if (isFollowing) {
        profileUser.followers = profileUser.followers.filter(id => id !== currentUser.userid);
        currentUser.following = currentUser.following.filter(id => id !== profileUser.userid);
        isFollowing = false;

    } else {
        // console.log("AA");
        profileUser.followers.push(currentUser.userid);
        currentUser.following.push(profileUser.userid);
        isFollowing = true;
    }
});

addEventListener("submit", (e) => {
    if (!e.target.classList || !e.target.classList.contains("comment-form")) return;
    e.preventDefault();

    const postID = e.target.getAttribute("data-id");
    if (!postID) return;
    const commentInput = document.querySelector(`.comment-input[data-id="${postID}"]`);
    if (!commentInput) return;

    const content = commentInput.value.trim();
    if (!content) return;

    createNewComment(postID, content);
    commentInput.value = "";
});


function createNewComment(postID, content) {
    const currentUser = getUserByID(getCurrentUser());
    if (currentUser == null) return;
    createComment(currentUser.userid, postID, content);
    displayPosts();
}

function handleLike(id, postID) {
    if (postID == null) {
        getPosts().find(p => p.id === id).ToggleLike();
    }
    else {
        getPosts().find(p => p.id === postID).comments.find(c => c.id === id).ToggleLike();
    }

}
//edit it from Abdullah:
function createNewPost(content) {
    if (!content) return;
    const currentUser = getUserByID(getCurrentUser());
    if (currentUser == null) {
        const msg = document.getElementById("createPostMessage");
        if (msg) msg.textContent = "Please login first.";
        return;
    }
    createPost(currentUser.userid, content);
    displayPosts();
}

function displayPosts() {
    const postsContainer = document.getElementById("postsContainer");
    const posts = getPosts();
    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet. Create the first post.</p>";
        return;
    }
    postsContainer.innerHTML = posts.reverse().map(formatPost).join("");

}


function formatPost(post) {
    const author = getUserByID(post.authorID);

    return ` <section class="post" data-id="${post.id}">
                <div class="post-header">
                    
                    <div class="post-meta">
                        <img id="pfp_post" src="${author.profilePicture}" alt="${author.username}'s Profile Picture">
                        <a class="post-author" id="author_name" data-id="${post.authorID}" href="profile.html" >${author.username}</a> 
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>

                <div class="post-content">
                    <p>${post.content}</p>
                </div>

                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id}">❤️ ${post.likeNum}</button>
                    <button class="comment-btn" data-id="${post.id}">💬 Comment </button>
                    <button class="delete-btn" data-id="${post.id}" style="${(post.authorID === getCurrentUser()) ? "" : "display:none;"}">❌ Delete </button>
                </div>

                <form class="comment-form" data-id="${post.id}" style="display:none;">
                    <input type="text" class="comment-input" placeholder="Write a comment..." data-id="${post.id}">
                    <button type="submit">Submit</button>
                </form>
                 <div class="comments-section">
                    ${formatComments(post.comments)}
                </div>
            </section>`;

}

function formatComments(comments) {

    return comments.map(c => {
        const author = getUserByID(c.authorID);
        return `<div class="comment">
                        <img id="pfp_cmnt" src="${author.profilePicture}" alt="${author.username}'s Profile Picture">
                        <a class="post-author" id="author_name" data-id="${c.authorID}" href="profile.html" >${author.username}</a>
                        <p class="comment-text">${c.content}</p>
                        <div class="post-actions">
                              <button class="like-btn" data-id="${c.id}" data-postID="${c.postID}">❤️ ${c.likeNum}</button>
                              <button class="delete-btn" data-id="${c.id}" data-postID="${c.postID}" style="${(c.authorID === getCurrentUser()) ? "" : "display:none;"}">❌ Delete </button>
                        </div>
                    </div>`
    }).join("");
}

function initLogoutButton() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        logout();
    });
}

function initProfileButton() {
    document.querySelector("#profilebtn").addEventListener('click', () => {
        setProfileUser(getCurrentUser());
    });
}

function initSearchBar(Query) {
    const userlist = document.querySelector('#search-users');
    const users = getUsers().filter(u => u.username.toLowerCase().includes(Query.toLowerCase()));
    userlist.innerHTML = formatUsers(users);

}


function formatUsers(users) {

    return users.map(u => `
    <hr>
    <li>
        <img src="${u.profilePicture}" alt="${u.username}'s Profile Picture">
        <a id="author_name" data-id="${u.userid}" href="profile.html" >${u.username}</a>
        ${(u.bio.length === 0) ? "<p></p>" : `<p id="search-bio" ><q>${(u.bio.length > 40) ? u.bio.slice(0, 40) + "..." : u.bio}</q></p>`}
        <p id="search-followers" >Followers: ${u.followers.length}</p>
        <button id="search-btn" data-id="${u.userid}" >Follow</button>
    </li>
    `).join("");
}

function initFollowButton() {

    const searchbtn = document.querySelector('#search-btn');
    console.log(searchbtn)
    const currentUser = getUserByID(getCurrentUser());
    const profileUser = getUserByID(searchbtn.dataset.id);
    let isFollowing = (profileUser.followers.find(u => u.userid === currentUser.userid) != undefined);
    searchbtn.textContent = isFollowing ? "Follow" : "Unfollow";
}

displayPosts();

