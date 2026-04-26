import { getUserByID, getCurrentUser, saveUser, getProfileUser, edit_profile, setProfileUser } from "./user.js";
import { getPostsByUserID } from "./post.js";
import { checkLogin, logout } from "./auth.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();

const params = new URLSearchParams(window.location.search);
if (params.get("user")!==null) {
    const authorID = params.get("user");
    setProfileUser(authorID);}



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
    // console.log(profileUser);
    document.getElementById("username").textContent       = profileUser.username;
    document.querySelector("#profileHeader").querySelector("img").src = profileUser.profilePicture;
    document.getElementById("bio").textContent            = profileUser.bio || "";
    document.getElementById("followersCount").textContent = (profileUser.followers?.length ?? 0);
    document.getElementById("followingCount").textContent = (profileUser.following?.length ?? 0);
}

// ── Display profile posts ───────────────────────────────────
function displayProfilePosts() {
    const profileUser    = getUserByID(getProfileUser());
    if (!profileUser) return;

    const postsContainer = document.getElementById("postsContainer");
    const userPosts      = getPostsByUserID(getProfileUser())

    document.getElementById("postsCount").textContent = userPosts.length;

    postsContainer.innerHTML = userPosts.reverse().map(post => formatPost(post) ).join("");
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
                    <button class="like-btn" onclick="" data-id="${post.id}">❤️ ${post.likeNum}</button>
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
    let isFollowing = profileUser.followers?.includes(currentUser.userid);
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
    
    followBtn.addEventListener("click", () => {
        followBtn.textContent = isFollowing ? "Follow" : "Unfollow";
        // console.log(profileUser.followers)
        if(isFollowing){
            profileUser.followers = profileUser.followers.filter(id => id !== currentUser.userid);
            currentUser.following = currentUser.following.filter(id => id !== profileUser.userid);
            isFollowing = false;
            
        }else{
            // console.log("AA");
            profileUser.followers.push(currentUser.userid);
            currentUser.following.push(profileUser.userid);
            isFollowing = true; 
        }
        
        // console.log(profileUser,currentUser)

        saveUser(profileUser);
        saveUser(currentUser);
        displayProfileInfo(); // reprofileUser follower count
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

