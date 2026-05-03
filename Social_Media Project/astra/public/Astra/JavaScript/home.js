import { getCurrentUser, setProfileUser } from "./user.js";
import { logout } from "./auth.js";

// console.log(getPosts());
// checkLogin();



addEventListener("DOMContentLoaded", async () => {

    // makes searchbar empty
    document.querySelector('#search-users').innerHTML = ""

    if (getCurrentUser() == null) document.querySelector("#logoutBtn").innerHTML = "Login";

    const createPostForm = document.getElementById("createPostForm");
    initProfileButton()
    initLogoutButton()
    createPostForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const content = document.getElementById("postContent").value;
        await createNewPost(content);
        createPostForm.reset();
    });

    await displayPosts();
});

addEventListener("click", async (e) => {
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
        await handleLike(id, postID);
        await displayPosts();
    }
});

addEventListener("click", async (e) => {
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
            if (!!postID) await fetch(`/api/comments/${id}`, { method: 'DELETE' });
            else await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        }
        await displayPosts();
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
    if (e.target.classList && e.target.classList.contains("author_name")) {
        authorName = e.target;
    } else if (e.target.parentElement && e.target.parentElement.classList && e.target.parentElement.classList.contains("author_name")) {
        authorName = e.target.parentElement;
    }
    if (authorName !== null) {
        setProfileUser(authorName.dataset.id);
    }
});

document.querySelector('#search-bar').addEventListener("keyup", async (e) => {
    const searchbar = e.target.value.trim()
    // console.log(searchbar)
    if (!!searchbar) {
        await initSearchBar(searchbar);
    } else {
        document.querySelector('#search-users').innerHTML = ""
    }
});

//Here fot the follow fetching:--------------------------------
addEventListener('click', async (e) => {
    if (e.target.classList && e.target.classList.contains("search-btn")) {
        const profileUserId = e.target.dataset.id;
        const currentUserId = getCurrentUser();
        await fetch('/api/follows', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ followerId: currentUserId, followingId: profileUserId })
        });
        await initSearchBar(document.querySelector('#search-bar').value);
    }
});

addEventListener("submit", async (e) => {
    if (!e.target.classList || !e.target.classList.contains("comment-form")) return;
    e.preventDefault();

    const postID = e.target.getAttribute("data-id");
    if (!postID) return;
    const commentInput = document.querySelector(`.comment-input[data-id="${postID}"]`);
    if (!commentInput) return;

    const content = commentInput.value.trim();
    if (!content) return;

    await createNewComment(postID, content);
    commentInput.value = "";
});


async function createNewComment(postID, content) {
    const currentUser = getCurrentUser();
    if (currentUser == null) return;
    await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: currentUser, postId: postID, content })
    });
    // console.log('createNewComment done');
    await displayPosts();
}
//Here for the like fetching:--------------------------------
async function handleLike(id, postID) {
    const currentUser = getCurrentUser();
    if (currentUser == null) return;
    await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser, postId: postID ? null : id, commentId: postID ? id : null })
    });
}

//edit it from Abdullah:
async function createNewPost(content) {
    if (!content) return;
    const currentUser = getCurrentUser();
    if (currentUser == null) {
        const msg = document.getElementById("createPostMessage");
        if (msg) msg.textContent = "Please login first.";
        return;
    }
    await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: currentUser, content })
    });
    // console.log('createNewPost done');
    await displayPosts();
}

async function displayPosts() {
    const postsContainer = document.getElementById("postsContainer");
    const response = await fetch('/api/posts');
    const posts = await response.json();
    // console.log(posts);
    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet. Create the first post.</p>";
        return;
    }
    const htmlArray = await Promise.all(posts.map((p) => formatPost(p)));
    postsContainer.innerHTML = htmlArray.join("");
}


async function formatPost(post) {
    const authorResponse = await fetch(`/api/users?id=${post.authorId}`);
    const author = await authorResponse.json();
    const commentsHtml = await formatComments(post.comments);
    console.log(post.authorId);
    return ` <section class="post" data-id="${post.id}">
                <div class="post-header">

                    <div class="post-meta">

                        <a class="post-author author_name" data-id="${post.authorId}" href="profile.html" >
                        <img id="pfp_post" src="${author.profilePicture}" alt="${author.username}'s Profile Picture">
                        ${author.username}
                        </a>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>

                <div class="post-content">
                    <p>${post.content}</p>
                </div>

                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id}">❤️ ${post.likeNum}</button>
                    <button class="comment-btn" data-id="${post.id}">💬 Comment </button>
                    <button class="delete-btn" data-id="${post.id}" style="${(post.authorId === getCurrentUser()) ? "" : "display:none;"}">❌ Delete </button>
                </div>

                <form class="comment-form" data-id="${post.id}" style="display:none;">
                    <input type="text" class="comment-input" placeholder="Write a comment..." data-id="${post.id}">
                    <button type="submit">Submit</button>
                </form>
                 <div class="comments-section">
                    ${commentsHtml}
                </div>
            </section>`;

}

async function formatComments(comments) {
    const commentHtml = await Promise.all(comments.map(async c => {
        const authorResponse = await fetch(`/api/users?id=${c.authorId}`);
        const author = await authorResponse.json();
        return `<div class="comment">
                        <a class="post-author author_name" data-id="${c.authorId}" href="profile.html" >
                        <img id="pfp_cmnt" src="${author.profilePicture}" alt="${author.username}'s Profile Picture">
                        ${author.username}
                        </a>
                        <p class="comment-text">${c.content}</p>
                        <div class="post-actions">
                              <button class="like-btn" data-id="${c.id}" data-postID="${c.postID}">❤️ ${c.likeNum}</button>
                              <button class="delete-btn" data-id="${c.id}" data-postID="${c.postID}" style="${(c.authorId === getCurrentUser()) ? "" : "display:none;"}">❌ Delete </button>
                        </div>
                    </div>`;
    }));
    return commentHtml.join("");
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
//Check with it ..:--------------------
async function initSearchBar(Query) {
    const userlist = document.querySelector('#search-users');
    const response = await fetch(`/api/users?search=${Query}`);
    const users = await response.json();
    // console.log(users);
    userlist.innerHTML = formatUsers(users);
}


function formatUsers(users) {
    users[0].followers
    return users.map(u => `
    <hr>
    <li>
        <a class="author_name" data-id="${u.userid}" href="profile.html" >
        <img src="${u.profilePicture}" alt="${u.username}'s Profile Picture">
        ${u.username}
        </a>
        ${(u.bio.length === 0) ? "<p></p>" : `<p class="search-bio" ><q>${(u.bio.length > 40) ? u.bio.slice(0, 40) + "..." : u.bio}</q></p>`}
        <p class="search-followers" >Followers: ${u.followers.length}</p>
        <button class="search-btn" data-id="${u.userid}" >${(u.followers.some(id => id === getCurrentUser())) ? "Unfollow" : "Follow"}</button>
    </li>
    `).join("");
}


