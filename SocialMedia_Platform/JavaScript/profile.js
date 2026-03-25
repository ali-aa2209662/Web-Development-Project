// Check if user is logged in
function checkLogin() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
    }
}

checkLogin();

// Load data from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let profileUserId = Number(localStorage.getItem("profileUserId")) || currentUser;

// Get profile user
let profileUser = users.find(user => user.id == profileUserId);

if (!profileUser) {
    alert("User not found");
    window.location.href = "home.html";
}

// Ensure arrays exist
profileUser.followers = profileUser.followers || [];
profileUser.following = profileUser.following || [];

// Display profile info
document.getElementById("username").textContent = profileUser.username;
document.getElementById("bioText").textContent = profileUser.bio;
document.getElementById("followersCount").textContent = profileUser.followers.length;
document.getElementById("followingCount").textContent = profileUser.following.length;

// Display posts
let userPosts = posts.filter(post => post.userId == profileUserId);
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





// TESTING...   