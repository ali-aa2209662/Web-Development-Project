import { getCurrentUser, saveUser } from "./user.js";
import { checkLogin, logout } from "./auth.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();

// ── Run after DOM is ready ──────────────────────────────────
addEventListener("DOMContentLoaded", () => {
    fillForm();
    initSaveForm();
    initCancelButton();
    initLogoutButton();
    initEditProfileButton();
    initEditPictureButton();
});

// ── Pre-fill form with current user data ────────────────────
function fillForm() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    document.getElementById("editUsername").value = currentUser.username  || "";
    document.getElementById("editEmail").value    = currentUser.email     || "";
    document.getElementById("editBio").value      = currentUser.bio       || "";
    document.getElementById("editPassword").value = currentUser.password  || "";
}

// ── Save changes ─────────────────────────────────────────────
function initSaveForm() {
    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const currentUser = getCurrentUser();
        if (!currentUser) return;

        currentUser.username = document.getElementById("editUsername").value.trim();
        currentUser.email    = document.getElementById("editEmail").value.trim();
        currentUser.bio      = document.getElementById("editBio").value.trim();
        currentUser.password = document.getElementById("editPassword").value;

        saveUser(currentUser);   // persist via user.js — no direct localStorage here

        alert("Profile updated successfully!");
        window.location.href = "profile.html";
    });
}

// ── Cancel button ────────────────────────────────────────────
function initCancelButton() {
    document.getElementById("cancelBtn").addEventListener("click", () => {
        window.location.href = "profile.html";
    });
}

function editProfileInfobtn() { 
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const newUsername = document.getElementById("editUsername").value.trim();
    const newBio      = document.getElementById("editBio").value.trim();

    if (newUsername) currentUser.username = newUsername;
    if (newBio)      currentUser.bio = newBio;

    saveUser(currentUser);
    displayProfileInfo();
}

function editProfilePicturebtn() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const imageUrl = document.getElementById("editImage").value.trim();
    if (!imageUrl) {
        alert("Please enter a valid image URL.");
        return;
    }

    currentUser.profilePicture = imageUrl;
    saveUser(currentUser);
    document.getElementById("profilePicture").src = imageUrl;
}