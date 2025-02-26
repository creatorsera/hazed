document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profilePic');
    const tweetButton = document.getElementById('tweetButton');
    const tweetInput = document.getElementById('tweetInput');
    const tweetsList = document.getElementById('tweetsList');

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load Dark Mode Preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Profile Picture Upload
    profilePicInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profilePic.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Post Tweet
    tweetButton.addEventListener('click', () => {
        const tweetText = tweetInput.value.trim();
        if (tweetText.length > 0) {
            const tweetItem = document.createElement('li');
            tweetItem.classList.add('tweet');

            tweetItem.innerHTML = `
                <span>${tweetText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            tweetsList.prepend(tweetItem);

            // Edit Tweet
            tweetItem.querySelector('.edit-button').addEventListener('click', function() {
                const newText = prompt("Edit your tweet:", tweetText);
                if (newText) {
                    tweetItem.querySelector('span').textContent = newText;
                }
            });

            // Delete Tweet
            tweetItem.querySelector('.delete-button').addEventListener('click', function() {
                tweetItem.remove();
            });

            tweetInput.value = '';
        }
    });

    // Character Counter
    tweetInput.addEventListener('input', () => {
        const charCount = document.getElementById('charCount');
        charCount.textContent = `${tweetInput.value.length}/280`;
        charCount.style.color = tweetInput.value.length > 280 ? 'red' : '';
    });
});
