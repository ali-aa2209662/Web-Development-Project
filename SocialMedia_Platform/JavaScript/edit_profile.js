// Check login
checkLogin();

// Load users
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = JSON.parse(localStorage.getItem("currentUser"));

// Find current user
let currentUser = users.find(user => user.id == currentUserId);

// Fill form with existing data
document.getElementById("editUsername").value = currentUser.username;
document.getElementById("editEmail").value = currentUser.email;
document.getElementById("editBio").value = currentUser.bio;
document.getElementById("editPassword").value = currentUser.password;

// Handle form submit
document.getElementById("editProfileForm").addEventListener("submit", function(e) {
    e.preventDefault();

    currentUser.username = document.getElementById("editUsername").value;
    currentUser.email = document.getElementById("editEmail").value;
    currentUser.bio = document.getElementById("editBio").value;
    currentUser.password = document.getElementById("editPassword").value;

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Profile updated successfully!");

    // Go back to profile
    window.location.href = "profile.html";
});

// Cancel button
document.getElementById("cancelBtn").addEventListener("click", function() {
    window.location.href = "profile.html";
});