document.addEventListener("DOMContentLoaded", function () {
    const tweetButton = document.getElementById("tweetButton");
    const tweetsList = document.getElementById("tweetsList");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const tweetInput = document.getElementById("tweetInput");
    const charCount = document.getElementById("charCount");
    const profilePicInput = document.getElementById("profilePicInput");
    const profilePicPreview = document.getElementById("profilePicPreview");

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    tweetInput.addEventListener("input", function () {
        charCount.textContent = `${tweetInput.value.length}/280`;
        charCount.style.color = tweetInput.value.length > 280 ? "red" : "gray";
    });

    profilePicInput.addEventListener("change", function () {
        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    tweetButton.addEventListener("click", function () {
        const usernameInput = document.getElementById("usernameInput");
        const username = usernameInput.value.trim();
        const tweetText = tweetInput.value.trim();

        if (username && tweetText) {
            const tweetItem = document.createElement("li");
            tweetItem.className = "tweet";
            tweetItem.innerHTML = `
                <img src="${profilePicPreview.src}" class="profile-pic">
                <div class="tweet-content">
                    <strong>${username}</strong>
                    <p>${tweetText}</p>
                </div>
            `;
            tweetsList.prepend(tweetItem);
            tweetInput.value = "";
            charCount.textContent = "0/280";
        }
    });
});
