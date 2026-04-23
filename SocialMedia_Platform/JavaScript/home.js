import { getPosts, createPost, createComment, deleteComment, deletePost } from "./post.js";
import { getUserByID, getCurrentUser } from "./user.js";
import { logout } from "./auth.js";

// console.log(getPosts());
// checkLogin();

addEventListener("DOMContentLoaded", () => {
    
    const createPostForm = document.getElementById("createPostForm");
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
        if (confirm(`Are you sure you want to delete this ${(!!postID)?"comment":"post"}`)){
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
                        <a class="post-author" href="profile.html?user=${post.authorID}">${author.username}</a>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>

                <div class="post-content">
                    <p>${post.content}</p>
                </div>

                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id}">❤️ ${post.likeNum}</button>
                    <button class="comment-btn" data-id="${post.id}">💬 Comment </button>
                    <button class="delete-btn" data-id="${post.id}" style="${(post.authorID===getCurrentUser())?"":"display:none;"}">❌ Delete </button>
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
                        <span class="comment-author">${author.username}</span>
                        <p class="comment-text">${c.content}</p>
                        <div class="post-actions">
                              <button class="like-btn" data-id="${c.id}" data-postID="${c.postID}">❤️ ${c.likeNum}</button>
                              <button class="delete-btn" data-id="${c.id}" data-postID="${c.postID}" style="${(c.authorID===getCurrentUser())?"":"display:none;"}">❌ Delete </button>
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

displayPosts();

