import { getCurrentUser, getProfileUser, setProfileUser } from "./user.js";
import { checkLogin, logout } from "./auth.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();

const params = new URLSearchParams(window.location.search);
if (params.get("user") !== null) {
    const authorID = params.get("user");
    setProfileUser(authorID);
}



// ── Run after DOM is ready ──────────────────────────────────
addEventListener("DOMContentLoaded", async () => {

    await displayProfileInfo();
    await displayProfilePosts();
    await initFollowButton();
    initEditButton();
    initLogoutButton();

});

// ── Display profile info ────────────────────────────────────
async function displayProfileInfo() {
    const profileUserId = getProfileUser();
    if (!profileUserId) return;
    const response = await fetch(`/api/users?id=${profileUserId}`);
    const profileUser = await response.json();
    // console.log(profileUser);
    document.getElementById("username").textContent = profileUser.username;
    document.querySelector("#profileHeader").querySelector("img").src = profileUser.profilePicture;
    document.getElementById("bio").textContent = profileUser.bio || "";
    document.getElementById("followersCount").textContent = (profileUser.followers?.length ?? 0);
    document.getElementById("followingCount").textContent = (profileUser.following?.length ?? 0);
}

// ── Display profile posts ───────────────────────────────────
async function displayProfilePosts() {
    const profileUserId = getProfileUser();
    if (!profileUserId) return;

    const postsContainer = document.getElementById("postsContainer");
    const response = await fetch(`/api/posts/${profileUserId}?authorId=${profileUserId}`);
    const userPosts = await response.json();

    document.getElementById("postsCount").textContent = userPosts?.length ?? 0;

    if (!userPosts || userPosts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet.</p>";
        return;
    }
    postsContainer.innerHTML = userPosts.map(post => formatPost(post)).join("");
}

function formatPost(post) {

    return ` <section class="post" data-id="${post.id}">
                <div class="post-header">

                    <div class="post-meta">
                        <span class="post-author">${post.author?.username ?? ""}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                <div class="post-actions">
                    <button class="like-btn" onclick="" data-id="${post.id}">❤️ ${post.likeNum}</button>
                </div>

            </section>`;

}


// ── Follow / Unfollow ───────────────────────────────────────
async function initFollowButton() {
    const currentUserId = getCurrentUser();
    const profileUserId = getProfileUser();
    if (!currentUserId || !profileUserId) return;

    const response = await fetch(`/api/users?id=${profileUserId}`);
    const profileUser = await response.json();

    const followBtn = document.getElementById("followBtn");

    // Hide button if viewing own profile
    if (currentUserId === profileUser.id) {
        followBtn.style.display = "none";
        return;
    }

    followBtn.textContent = "Follow";

    followBtn.addEventListener("click", async () => {
        await fetch('/api/follows', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ followerId: currentUserId, followingId: profileUser.id })
        });
        await displayProfileInfo(); // refresh follower count
    });
}

// ── Edit profile button ─────────────────────────────────────
function initEditButton() {
    const currentUserId = getCurrentUser();
    const profileUserId = getProfileUser();
    if (!currentUserId || !profileUserId) return;

    const editBtn = document.getElementById("editBtn");

    // Only show edit button on own profile
    if (currentUserId !== profileUserId) {
        editBtn.style.display = "none";
        return;
    }

    editBtn.addEventListener("click", () => {
        window.location.href = "edit_profile.html";
    });

}

// ── Logout button ───────────────────────────────────────────
function initLogoutButton() {
    document.getElementById("logoutBtn").addEventListener("click", logout);

}