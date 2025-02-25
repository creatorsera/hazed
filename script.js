document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("usernameInput");
    const tweetInput = document.getElementById("tweetInput");
    const tweetButton = document.getElementById("tweetButton");
    const tweetsList = document.getElementById("tweetsList");
    const profilePicInput = document.getElementById("profilePicInput");
    const profilePicPreview = document.getElementById("profilePicPreview");

    let profilePicUrl = "default-avatar.png"; // Default profile pic

    // Upload Profile Picture
    profilePicInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicUrl = e.target.result;
                profilePicPreview.src = profilePicUrl;
            };
            reader.readAsDataURL(file);
        }
    });

    // Tweet Function
    tweetButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        const tweetText = tweetInput.value.trim();
        if (username && tweetText) {
            addTweetToUI({ username, tweetText, profilePicUrl, likes: 0 });
            tweetInput.value = "";
        }
    });

    function addTweetToUI(tweetData) {
        const tweetItem = document.createElement("li");
        tweetItem.className = "tweet";

        tweetItem.innerHTML = `
            <img src="${tweetData.profilePicUrl}" class="profile-pic">
            <div class="tweet-content">
                <strong>${tweetData.username}</strong> <br>
                <p class="tweet-text">${tweetData.tweetText}</p>
                <div class="tweet-buttons">
                    <button class="like-button">❤️ 0</button>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        `;
        tweetsList.prepend(tweetItem);

        // Like Button
        const likeButton = tweetItem.querySelector(".like-button");
        likeButton.addEventListener("click", function () {
            let likes = parseInt(likeButton.innerText.split(" ")[1]) + 1;
            likeButton.innerHTML = `❤️ ${likes}`;
            likeButton.classList.add("liked");
        });

        // Edit Button
        const editButton = tweetItem.querySelector(".edit-button");
        editButton.addEventListener("click", function () {
            tweetInput.value = tweetData.tweetText;
            tweetItem.remove();
        });

        // Delete Button
        const deleteButton = tweetItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            tweetItem.remove();
        });
    }
});
