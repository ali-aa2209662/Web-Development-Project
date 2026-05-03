import { getCurrentUser, setProfileUser } from "./user.js";
import { checkLogin, logout } from "./auth.js";

// ── Auth guard ──────────────────────────────────────────────
checkLogin();

// ── Run after DOM is ready ──────────────────────────────────
addEventListener("DOMContentLoaded", async () => {

    await fillForm();
    initSaveForm();
    initCancelButton();
    initLogoutButton();

});

// ── Pre-fill form with current user data ────────────────────
async function fillForm() {
    const currentUserId = getCurrentUser();
    if (!currentUserId) return;
    const response = await fetch(`/api/users?id=${currentUserId}`);
    const currentUser = await response.json();
    if (!currentUser) return;

    document.getElementById("editUsername").value = currentUser.username || "";
    document.getElementById("editEmail").value = currentUser.email || "";
    document.getElementById("editBio").value = currentUser.bio || "";
    document.getElementById("editPassword").value = currentUser.password || "";

    // Set profile image preview
    const preview = document.getElementById("preview");
    preview.src = currentUser.profilePicture || "assets/PFP_Blank.jpg";
}


// ── Save changes ─────────────────────────────────────────────
function initSaveForm() {
    document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const imageInput = document.getElementById("imageInput");
        // console.log(imageInput);
        const preview = document.getElementById("preview");
        const username = document.getElementById("editUsername").value.trim();
        const email = document.getElementById("editEmail").value.trim();
        const bio = document.getElementById("editBio").value.trim();
        const newpassword = document.getElementById("editPassword").value;
        const cnfrmpassword = document.getElementById("confirmPassword").value;

        const currentUserId = getCurrentUser();

        // check if the password is correct
        const currentUserRes = await fetch(`/api/users?id=${currentUserId}`);
        const currentUser = await currentUserRes.json();
        const password = (newpassword === cnfrmpassword) ? newpassword : currentUser.password;

        const file = imageInput.files[0];

        if (!file) {
            await fetch(`/api/users?id=${currentUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, profilePicture: "assets/PFP_Blank.jpg", bio })
            });
        } else {
            const reader = new FileReader();

            // console.log(currentUser)
            reader.onload = async () => {
                const picture = reader.result;

                await fetch(`/api/users?id=${currentUserId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password, profilePicture: picture, bio })
                });
                // Display image
                preview.src = picture;
                // console.log(preview.src);
            };

            reader.readAsDataURL(file);
        }


        // fillForm();
        alert("Profile updated successfully!");
        setProfileUser(getCurrentUser());
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
