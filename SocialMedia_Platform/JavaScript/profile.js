import { getUserByID, getCurrentUser, saveUser } from "./user.js";
import { getPosts } from "./post.js";
import { checkLogin, logout } from "./auth.js";
import { getData } from "./storage.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();

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
    const profileUser = getProfileUser();
    if (!profileUser) return;

    document.getElementById("username").textContent       = profileUser.username;
    document.getElementById("bio").textContent            = profileUser.bio || "";
    document.getElementById("followersCount").textContent = (profileUser.followed?.length ?? 0);
    document.getElementById("followingCount").textContent = (profileUser.following?.length ?? 0);
}

// ── Display profile posts ───────────────────────────────────
function displayProfilePosts() {
    const profileUser    = getProfileUser();
    if (!profileUser) return;

    const postsContainer = document.getElementById("postsContainer");
    const allPosts       = getPosts();
    const userPosts      = allPosts.filter(p => p.authorID === profileUser.userid);

    document.getElementById("postsCount").textContent = userPosts.length;

    postsContainer.innerHTML = userPosts.map(post => `
        <div class="post">
            <p>${post.content}</p>
            <small>${post.date}</small>
        </div>
    `).join("");
}

// ── Follow / Unfollow ───────────────────────────────────────
function initFollowButton() {
    const currentUser = getCurrentUser();
    const profileUser = getProfileUser();
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
        const fresh        = getCurrentUser();
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
    const currentUser = getCurrentUser();
    const profileUser = getProfileUser();

    document.getElementById("editBtn").addEventListener("click", () => {
        if (currentUser?.userid === profileUser?.userid) {
            window.location.href = "edit_profile.html";
        } else {
            alert("You can only edit your own profile.");
        }
    });
}

// ── Logout button ───────────────────────────────────────────
function initLogoutButton() {
    document.getElementById("logoutBtn").addEventListener("click", logout);
}

// ── Helper: get the user whose profile is being viewed ──────
// profileUserId is saved in WebData when navigating to someone's profile.
// Falls back to the currently logged-in user (own profile).
function getProfileUser() {
    const data          = getData();
    const currentUser   = data?.currentUser;
    const profileUserId = data?.profileUserId ?? currentUser?.userid;

    const user = data?.users?.find(u => u.userid === profileUserId);
    if (!user) {
        alert("User not found.");
        window.location.href = "home.html";
        return null;
    }
    return user;
}