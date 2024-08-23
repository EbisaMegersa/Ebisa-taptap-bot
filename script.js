let balance = 0;
let level = 1;
let progressBalance = 500; // Start with 500 points for 500

function redirectToTelegram() {
    window.location.href = "https://t.me/airdrops_uncle";
}

function incrementBalance() {
    if (progressBalance > 0) {
        balance += 1; // Increase the main balance
        progressBalance -= 1; // Decrease progress by 1 point on each tap
        updateProgressBar();
        
        document.getElementById('balance').innerText = `Balance: ${balance}`;
        
        // Level up mechanism
        if (balance % 10 === 0) { 
            level += 1;
            document.getElementById('level').innerText = `Level: ${level}`;
        }
    }
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