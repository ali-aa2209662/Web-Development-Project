// Load data from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let profileUserId = localStorage.getItem("profileUserId") || currentUser;

// Get profile user
let profileUser = users.find(user => user.id == profileUserId);

// Display profile info
document.getElementById("username").textContent = profileUser.username;
document.getElementById("bio").textContent = profileUser.bio;
document.getElementById("followersCount").textContent = profileUser.followers.length;
document.getElementById("followingCount").textContent = profileUser.following.length;

// Display posts count
let userPosts = posts.filter(post => post.userId == profileUserId);
document.getElementById("postsCount").textContent = userPosts.length;

// Show posts
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

    if (currentUserData.following.includes(profileUserId)) {
        followBtn.textContent = "Unfollow";
    } else {
        followBtn.textContent = "Follow";
    }

    followBtn.onclick = () => {
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
    };
}

// Edit profile button
document.getElementById("editBtn").onclick = () => {
    if (currentUser == profileUserId) {
        window.location.href = "edit-profile.html";
    } else {
        alert("You can only edit your own profile");
    }
};

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}