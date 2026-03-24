import { getPosts } from "./post.js";
import { getUserByID } from "./user.js";

console.log(getPosts());

function displayPosts() {
    const postsContainer = document.getElementById("postsContainer");
    const posts = getPosts();
    postsContainer.innerHTML = posts.map(formatPost).join("");

}


function formatPost(post) {
    const author = getUserByID(post.authorID);

    return ` <section class="post" data-post-id="${post.id}">
                <div class="post-header">
                    
                    <div class="post-meta">
                        <span class="post-author">${author.username}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>

                    <img src="assets/example-image.jpg" alt="Example image" class="post-image">
                </div>
                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id} ">❤️ ${post.likeNum}</button>
                    <button class="comment-btn" data-id="${post.id} ">💬 Comment </button>
                </div>
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

