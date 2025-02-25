document.addEventListener('DOMContentLoaded', function () {
    const tweetButton = document.getElementById('tweetButton');
    const usernameInput = document.getElementById('usernameInput');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsList = document.getElementById('tweetsList');
    const charCount = document.getElementById('charCount');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const profilePicInput = document.getElementById('profilePic');
    let profilePicUrl = '';

    // Load Dark Mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Profile Picture Upload
    profilePicInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    tweetButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        const tweetText = tweetInput.value.trim();
        const timestamp = new Date().toLocaleString();
        const avatar = profilePicUrl || `https://i.pravatar.cc/40?u=${username}`;

        if (username && tweetText) {
            const tweetData = { username, tweetText, timestamp, avatar, likes: 0 };
            addTweetToUI(tweetData);
            tweetInput.value = '';
            charCount.textContent = '0/280';
        }
    });

    tweetInput.addEventListener('input', function () {
        charCount.textContent = `${tweetInput.value.length}/280`;
        charCount.style.color = tweetInput.value.length > 280 ? 'red' : 'black';
    });

    function addTweetToUI(tweetData) {
        const tweetItem = document.createElement('li');
        tweetItem.className = 'tweet';
        tweetItem.innerHTML = `
            <img src="${tweetData.avatar}" class="profile-pic" alt="Avatar">
            <div class="tweet-content">
                <div class="tweet-header">
                    <strong>${tweetData.username}</strong> - <small>${tweetData.timestamp}</small>
                </div>
                <p class="tweet-text">${tweetData.tweetText}</p>
                <div class="tweet-buttons">
                    <button class="like-button">❤️ ${tweetData.likes}</button>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        `;
        tweetsList.prepend(tweetItem);

        const likeButton = tweetItem.querySelector('.like-button');
        const editButton = tweetItem.querySelector('.edit-button');
        const deleteButton = tweetItem.querySelector('.delete-button');
        const tweetTextElement = tweetItem.querySelector('.tweet-text');

        likeButton.addEventListener('click', function () {
            tweetData.likes++;
            likeButton.textContent = `❤️ ${tweetData.likes}`;
            likeButton.classList.add('liked');
        });

        editButton.addEventListener('click', function () {
            const newText = prompt('Edit your tweet:', tweetData.tweetText);
            if (newText !== null) {
                tweetData.tweetText = newText;
                tweetTextElement.textContent = newText;
            }
        });

        deleteButton.addEventListener('click', function () {
            tweetItem.remove();
        });
    }
});
