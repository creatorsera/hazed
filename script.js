// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Profile Picture Picker
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

// Emoji Picker
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
