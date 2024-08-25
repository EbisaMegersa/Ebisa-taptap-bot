let balance = 0;
let level = 1;
let progressBalance = 500; // Start with 500 points for progress
const incrementValue = 1; // Define increment value for balance

document.addEventListener('DOMContentLoaded', () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let username = user.username || user.first_name || 'Unknown';
        if (username.length > 10) {
            username = username.substring(0, 10) + '...';
        }
        document.getElementById('username-value').innerText = username;

        // Retrieve stored balance and level from localStorage
        const storedBalance = localStorage.getItem(`balance_${user.id}`);
        const storedLevel = localStorage.getItem(`level_${user.id}`);

        if (storedBalance !== null) {
            balance = parseFloat(storedBalance);
        }

        if (storedLevel !== null) {
            level = parseInt(storedLevel, 10);
        }

        document.getElementById('balance').innerText = `Balance: ${balance}`;
        document.getElementById('level').innerText = `Level: ${level}`;

        updateProgressBar(); // Ensure the progress bar is updated
    } else {
        alert("Unable to get Telegram user info.");
    }
});

document.getElementById('tap-photo').addEventListener('touchstart', (event) => {
    event.preventDefault();

    // Handle photo tap
    handleTap(event.touches);
});

function handleTap(touches) {
    if (progressBalance > 0) {
        // Add +1 to user balance and remove 1 from progress balance
        balance += incrementValue;
        progressBalance -= incrementValue;

        // Update balance and progress bar
        document.getElementById('balance').innerText = `Balance: ${balance}`;
        document.getElementById('level').innerText = `Level: ${level}`;
        updateProgressBar();

        // Save updated values to localStorage
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
            localStorage.setItem(`level_${user.id}`, level);
        }

        // Show floating text for each touch
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            createFloatingText(touch.clientX, touch.clientY, '+1 ETB');
        }
    }
}

function createFloatingText(x, y, text) {
    const floatingText = document.createElement('div');
    floatingText.innerText = text;
    floatingText.className = 'floating-text'; // Use CSS class for styling
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    document.body.appendChild(floatingText);

    // Animate floating text
    setTimeout(() => {
        floatingText.style.transform = 'translateY(-70px)';
        floatingText.style.opacity = '0';
    }, 50);

    // Remove the floating text after animation
    setTimeout(() => {
        floatingText.remove();
    }, 1050);
}

function updateProgressBar() {
    let progressWidth = (progressBalance / 500) * 100; // Progress width as a percentage of 500
    document.getElementById('progress-bar').style.width = `${progressWidth}%`;
    document.getElementById('progress-bar').innerText = `${progressBalance}`; // Display progress percentage
}

// Automatically add +1 to the progress balance every second
setInterval(() => {
    if (progressBalance < 500) { // Ensure it doesn't exceed 500
        progressBalance += 1;
        updateProgressBar();
    }
}, 1000); // 1000 milliseconds = 1 second