import { getCurrentUser, getProfileUser , edit_profile, getUserByID } from "./user.js";
import { checkLogin, logout } from "./auth.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();

// ── Run after DOM is ready ──────────────────────────────────
addEventListener("DOMContentLoaded", () => {
    fillForm();
    initSaveForm();
    initCancelButton();
    initLogoutButton();
    

});

// ── Pre-fill form with current user data ────────────────────
function fillForm() {
    const currentUser = getUserByID(getCurrentUser());
    if (!currentUser) return;

    document.getElementById("editUsername").value = currentUser.username || "";
    document.getElementById("editEmail").value    = currentUser.email || "";
    document.getElementById("editBio").value      = currentUser.bio || "";
    document.getElementById("editPassword").value = currentUser.password || "";

    // Set profile image preview
    const preview = document.getElementById("preview");
    preview.src = currentUser.profilePicture || "assets/PFP_Blank.jpg";
}


// ── Save changes ─────────────────────────────────────────────
function initSaveForm() {
    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const imageInput = document.getElementById("imageInput");
        const preview = document.getElementById("preview");
        const username = document.getElementById("editUsername").value.trim();
        const email    = document.getElementById("editEmail").value.trim();
        const bio      = document.getElementById("editBio").value.trim();
        const newpassword = document.getElementById("editPassword").value;
        const cnfrmpassword = document.getElementById("confirmPassword").value;
        // check if the password is correct
        const password = (newpassword===cnfrmpassword)? newpassword : getUserByID(getCurrentUser()).password ;

        const file = imageInput.files[0];
        if (!file ) {
            edit_profile(username,email,password,"assets/PFP_Blank.jpg",bio);
            return
        }
        const reader = new FileReader();
        console.log(getUserByID(getCurrentUser()))
        reader.onload = () => {
            const picture = reader.result;

            edit_profile(username,email,password,picture,bio);
            // Display image
            preview.src = picture;
            // console.log(preview.src);
        };

        reader.readAsDataURL(file);
        // fillForm();
        // alert("Profile updated successfully!");
        // window.location.href = "profile.html";
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

 