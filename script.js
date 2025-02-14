document.addEventListener('DOMContentLoaded', function () {
    const tweetButton = document.getElementById('tweetButton');
    const usernameInput = document.getElementById('usernameInput');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsList = document.getElementById('tweetsList');
    const charCount = document.getElementById('charCount');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Dark Mode Setup
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    tweetButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        const tweetText = tweetInput.value.trim();
        const timestamp = new Date().toLocaleString();
        const avatar = `https://i.pravatar.cc/40?u=${username}`; // Random avatar

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
                <button class="like-button">❤️ ${tweetData.likes}</button>
            </div>
        `;
        tweetsList.prepend(tweetItem);

        const likeButton = tweetItem.querySelector('.like-button');
        likeButton.addEventListener('click', function () {
            tweetData.likes++;
            likeButton.textContent = `❤️ ${tweetData.likes}`;
            likeButton.classList.add('liked'); // Change color on click
        });
    }
});
