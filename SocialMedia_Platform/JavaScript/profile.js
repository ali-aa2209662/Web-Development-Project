import { getUserByID, getCurrentUser, saveUser, getProfileUser, edit_profile, setProfileUser } from "./user.js";
import { getPostsByUserID } from "./post.js";
import { checkLogin, logout } from "./auth.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();
const params = new URLSearchParams(window.location.search);
const authorID = params.get("user");
setProfileUser(authorID);

// ── Run after DOM is ready ──────────────────────────────────
addEventListener("DOMContentLoaded", () => {
    
    displayProfileInfo();
    displayProfilePosts();
    initFollowButton();
    initEditButton();
    initLogoutButton();

});

// ── Display profile info ────────────────────────────────────
function displayProfileInfo() {
    const profileUser = getUserByID(getProfileUser());
    if (!profileUser) return;

    document.getElementById("username").textContent       = profileUser.username;
    document.getElementById("bio").textContent            = profileUser.bio || "";
    document.getElementById("followersCount").textContent = (profileUser.followed?.length ?? 0);
    document.getElementById("followingCount").textContent = (profileUser.following?.length ?? 0);
}

// ── Display profile posts ───────────────────────────────────
function displayProfilePosts() {
    const profileUser    = getUserByID(getProfileUser());
    if (!profileUser) return;

    const postsContainer = document.getElementById("postsContainer");
    const userPosts      = getPostsByUserID(getProfileUser())

    document.getElementById("postsCount").textContent = userPosts.length;

    postsContainer.innerHTML = userPosts.map(post => formatPost(post) ).join("");
}

function formatPost(post) {
    const author = getUserByID(post.authorID);

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
                </div>
                
            </section>`;

}


// ── Follow / Unfollow ───────────────────────────────────────
function initFollowButton() {
    const currentUser = getUserByID(getCurrentUser());
    const profileUser = getUserByID(getProfileUser());
    if (!currentUser || !profileUser) return;

    const followBtn = document.getElementById("followBtn");

    // Hide button if viewing own profile
    if (currentUser.userid === profileUser.userid) {
        followBtn.style.display = "none";
        return;
    }

    // Set initial button label
    const isFollowing = currentUser.followed?.includes(profileUser.userid);
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";

    followBtn.addEventListener("click", () => {
        // Re-fetch fresh data each click
        const fresh        = getUserByID(getCurrentUser());
        fresh.followed     = fresh.followed || [];
        const alreadyFollowing = fresh.followed.includes(profileUser.userid);

        if (alreadyFollowing) {
            fresh.followed = fresh.followed.filter(id => id !== profileUser.userid);
            followBtn.textContent = "Follow";
        } else {
            fresh.followed.push(profileUser.userid);
            followBtn.textContent = "Unfollow";
        }

        saveUser(fresh);
        displayProfileInfo(); // refresh follower count
    });
}

// ── Edit profile button ─────────────────────────────────────
function initEditButton() {
    const currentUser = getUserByID(getCurrentUser());
    const profileUser = getUserByID(getProfileUser());
    if (!currentUser || !profileUser) return;

    const editBtn = document.getElementById("editBtn");

    // Only show edit button on own profile
    if (currentUser.userid !== profileUser.userid) {
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

