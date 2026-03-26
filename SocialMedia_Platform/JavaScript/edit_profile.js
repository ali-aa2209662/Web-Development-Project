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
    setupImageUpload();

});

// ── Pre-fill form with current user data ────────────────────
function fillForm() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    document.getElementById("editUsername").value = currentUser.username || "";
    document.getElementById("editEmail").value    = currentUser.email || "";
    document.getElementById("editBio").value      = currentUser.bio || "";
    document.getElementById("editPassword").value = currentUser.password || "";

    // ✅ Set profile image preview
    const preview = document.getElementById("preview");
    preview.src = currentUser.profilePicture || "assets/Avatar-01.svg";
}

function setupImageUpload() {
    const imageInput = document.getElementById("imageInput");
    const preview = document.getElementById("preview");
    const uploadBtn = document.getElementById("uploadBtn");

    // Click button triggers hidden file input
        uploadBtn.addEventListener("click", function() {
            imageInput.click();
        });
    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        if (file) {
            preview.src = URL.createObjectURL(file);
        } else {
            preview.src = "assets/Avatar-01.svg";
        }

    });
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
  

function initLogoutButton() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        logout();
    });
}

 