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

let postsContainer = document.getElementById("postsContainer");
postsContainer.innerHTML = "";

userPosts.forEach(post => {
    let postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
        <p>${post.content}</p>
        <small>${post.timestamp}</small>
    `;

    postsContainer.appendChild(postDiv);
});

// Follow / Unfollow button
let followBtn = document.getElementById("followBtn");

if (currentUser == profileUserId) {
    followBtn.style.display = "none";
} else {
    let currentUserData = users.find(u => u.id == currentUser);
    currentUserData.following = currentUserData.following || [];

    if (currentUserData.following.includes(profileUserId)) {
        followBtn.textContent = "Unfollow";
    } else {
        followBtn.textContent = "Follow";
    }

    followBtn.addEventListener("click", function () {
        if (currentUserData.following.includes(profileUserId)) {
            // Unfollow
            currentUserData.following = currentUserData.following.filter(id => id != profileUserId);
            profileUser.followers = profileUser.followers.filter(id => id != currentUser);
            followBtn.textContent = "Follow";
        } else {
            // Follow
            currentUserData.following.push(profileUserId);
            profileUser.followers.push(currentUser);
            followBtn.textContent = "Unfollow";
        }

        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    });
}

// Edit profile button
document.getElementById("editBtn").addEventListener("click", function () {
    if (currentUser == profileUserId) {
        window.location.href = "edit-profile.html";
    } else {
        alert("You can only edit your own profile");
    }
});

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Logout button event
document.getElementById("logoutBtn").addEventListener("click", logout);