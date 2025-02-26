document.addEventListener("DOMContentLoaded", function () {
    const tweetButton = document.getElementById("tweetButton");
    const tweetsList = document.getElementById("tweetsList");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const tweetInput = document.getElementById("tweetInput");
    const charCount = document.getElementById("charCount");

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Character Counter
    tweetInput.addEventListener("input", function () {
        const count = tweetInput.value.length;
        charCount.textContent = `${count}/280`;
        charCount.style.color = count > 280 ? "red" : "gray";
    });

    // Post a Tweet
    tweetButton.addEventListener("click", function () {
        const usernameInput = document.getElementById("usernameInput");
        const profilePicInput = document.getElementById("profilePicInput");

        const username = usernameInput.value.trim();
        const tweetText = tweetInput.value.trim();
        const profilePic = profilePicInput.files[0];

        if (username && tweetText) {
            const tweetItem = document.createElement("li");
            tweetItem.className = "tweet";

            // Profile Picture
            let profilePicUrl = "default-avatar.png"; // Default profile picture
            if (profilePic) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    profilePicUrl = event.target.result;
                    updateTweetElement(tweetItem, profilePicUrl, username, tweetText);
                };
                reader.readAsDataURL(profilePic);
            } else {
                updateTweetElement(tweetItem, profilePicUrl, username, tweetText);
            }

            tweetsList.prepend(tweetItem);
            tweetInput.value = "";
            charCount.textContent = "0/280";
        }
    });

    function updateTweetElement(tweetItem, profilePicUrl, username, tweetText) {
        tweetItem.innerHTML = `
            <img src="${profilePicUrl}" class="profile-pic">
            <div class="tweet-content">
                <strong>${username} <span class="verified">✔️</span></strong>
                <p>${tweetText}</p>
            </div>
            <div class="tweet-actions">
                <button class="edit-button">✏️</button>
                <button class="delete-button">🗑️</button>
            </div>
        `;

        // Edit Tweet
        tweetItem.querySelector(".edit-button").addEventListener("click", function () {
            const newTweet = prompt("Edit your tweet:", tweetText);
            if (newTweet) {
                tweetItem.querySelector(".tweet-content p").textContent = newTweet;
            }
        });

        // Delete Tweet
        tweetItem.querySelector(".delete-button").addEventListener("click", function () {
            tweetItem.remove();
        });
    }
});
document.getElementById("profilePicInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePicPreview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}
const emojiButton = document.getElementById("emojiButton");
const emojiPicker = document.getElementById("emojiPicker");
const tweetInput = document.getElementById("tweetInput");

// Emojis list
const emojis = ["😀", "😂", "😍", "🥺", "🔥", "👍", "😎", "💡", "🎉"];

emojis.forEach(emoji => {
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style.cursor = "pointer";
    span.addEventListener("click", function () {
        tweetInput.value += emoji;
    });
    emojiPicker.appendChild(span);
});

emojiButton.addEventListener("click", function () {
    emojiPicker.classList.toggle("hidden");
});
