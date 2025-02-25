document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const tweetButton = document.getElementById('tweetButton');
    const usernameInput = document.getElementById('usernameInput');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsList = document.getElementById('tweetsList');

    // 🌙 Load Dark Mode Preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    // 🌙 Toggle Dark Mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // 📸 Profile Picture Upload
    profilePicInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicPreview.src = e.target.result;
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load Profile Picture from LocalStorage
    if (localStorage.getItem('profilePic')) {
        profilePicPreview.src = localStorage.getItem('profilePic');
    }

    // ✨ Add New Tweet
    tweetButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        const tweetText = tweetInput.value.trim();
        const profilePic = profilePicPreview.src;

        if (username && tweetText) {
            const tweetItem = document.createElement('li');
            tweetItem.className = 'tweet';
            tweetItem.innerHTML = `
                <img src="${profilePic}" class="profile-pic">
                <div>
                    <strong>${username}</strong>
                    <p>${tweetText}</p>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;

            tweetsList.appendChild(tweetItem);
            tweetInput.value = ''; // Clear input field
        }
    });

    // 📝 Edit & Delete Tweet
    tweetsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            event.target.closest('.tweet').remove();
        } else if (event.target.classList.contains('edit-button')) {
            const tweetItem = event.target.closest('.tweet');
            const tweetText = tweetItem.querySelector('p');
            const newText = prompt('Edit your tweet:', tweetText.textContent);
            if (newText !== null) {
                tweetText.textContent = newText;
            }
        }
    });
});
