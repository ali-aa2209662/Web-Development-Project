import { getPosts, createPost, createComment } from "./post.js";
import { getUserByID, getCurrentUser } from "./user.js";

console.log(getPosts());

addEventListener("DOMContentLoaded", () => {
    const createPostForm = document.getElementById("createPostForm");

    createPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = document.getElementById("postContent").value;
        createNewPost(content);
        createPostForm.reset();
    });
});

addEventListener("click", (e) => {
    if (e.target.classList.contains("like-btn")) {
        const id = e.target.getAttribute("data-id");
        const postID = e.target.getAttribute("data-postID");
        if (!id) return;
        handleLike(id, postID);
        displayPosts();
    }
});

addEventListener("click", (e) => {
    if (e.target.classList.contains("comment-btn")) {
        const postID = e.target.getAttribute("data-id");
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
    const currentUser = getCurrentUser();
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

function createNewPost(content) {
    const currentUser = getCurrentUser();
    if (currentUser == null) return;
    createPost(currentUser.userid, content);
     displayPosts();
}


function displayPosts() {
    const postsContainer = document.getElementById("postsContainer");
    const posts = getPosts();
    postsContainer.innerHTML = posts.map(formatPost).join("");

}


function formatPost(post) {
    const author = getUserByID(post.authorID) || { username: "Unknown" };

    return ` <section class="post" data-id="${post.id}">
                <div class="post-header">
                    
                    <div class="post-meta">
                        <span class="post-author">${author.username}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id}">❤️ ${post.likeNum}</button>
                    <button class="comment-btn" data-id="${post.id}">💬 Comment </button>
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
        return `<div class="comment">
                        <span class="comment-author">${c.authorID}</span>
                        <p class="comment-text">${c.content}</p>
                        <div class="post-actions">
                              <button class="like-btn" data-id="${c.id}" data-postID="${c.postID}">❤️ ${c.likeNum}</button>
                        </div>
                    </div>`
    }).join("");
}

displayPosts();

