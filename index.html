// Assuming you're using Telegram Web App API and an external ad SDK
const botToken = "7434724514:AAF6BsLMHp6jyDnVQTqnSYbKkgBCXF9ox2w"; // Your bot token
const chatId = "7987662357";  // Your chat ID

const userInfoElement = document.getElementById("user-info");
const pointsElement = document.getElementById("points");
const leaderboardList = document.getElementById("leaderboard-list");
const adStatusElement = document.getElementById("ad-status");
const adFrame = document.getElementById("ad-frame");

let user = {
    name: "Guest",
    id: null,
    points: 0
};

// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Fetch user info from Telegram Web App API
async function loadUserInfo() {
    try {
        const userDetails = tg.initDataUnsafe;
        user = {
            name: userDetails.user.first_name || "Guest",
            id: userDetails.user.id,
            points: userDetails.user.points || 0
        };
        userInfoElement.textContent = `Welcome, ${user.name}`;
        pointsElement.textContent = user.points;
    } catch (err) {
        console.error("Error loading user info:", err);
        userInfoElement.textContent = "Failed to load user info.";
    }
}

// Show rewarded ad and reward the user
async function showRewardedAd() {
    adStatusElement.textContent = "Loading ad...";

    try {
        // Simulate showing ad (replace with your actual ad function)
        await show_9045455(); // This is your ad function, replace with actual SDK call

        // After the ad is shown, reward the user
        user.points += 10;  // Reward points for watching the ad
        pointsElement.textContent = user.points;
        adStatusElement.textContent = "Ad completed! You've earned 10 points!";
        
        // Send a message to your Telegram bot when the user watches an ad and earns points
        const message = `User ${user.name} watched an ad and earned 10 points!`;
        sendTelegramMessage(message);

        alert("You have watched the ad! You've earned 10 points!");
    } catch (error) {
        console.error("Error showing rewarded ad:", error);
        adStatusElement.textContent = "Failed to load the ad. Please try again later.";
        alert("Failed to load the ad. Please try again later.");
    }
}

// Function to send a message to your Telegram bot
async function sendTelegramMessage(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const payload = {
        chat_id: chatId,
        text: message,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.ok) {
            console.log("Message sent successfully:", data);
        } else {
            console.error("Error sending message:", data);
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Handle withdrawal
async function withdrawPoints() {
    if (user.points >= 50) {  // Minimum withdrawal threshold
        try {
            await fetch('https://api.example.com/withdraw', {
                method: 'POST',
                body: JSON.stringify({ userId: user.id, points: user.points }),
                headers: { 'Content-Type': 'application/json' }
            });
            alert(`You successfully withdrew ${user.points} points!`);
            user.points = 0;
            pointsElement.textContent = user.points;
        } catch (error) {
            alert("Error during withdrawal, please try again later.");
        }
    } else {
        alert("You need at least 50 points to withdraw.");
    }
}

// Fetch leaderboard dynamically (simulated API call)
async function loadLeaderboard() {
    try {
        const response = await fetch('https://api.example.com/getLeaderboard');  // Replace with actual API
        const leaderboard = await response.json();
        leaderboardList.innerHTML = ''; // Clear existing list
        leaderboard.forEach(earner => {
            const listItem = document.createElement('li');
            listItem.textContent = `${earner.name} - ${earner.points} Points`;
            leaderboardList.appendChild(listItem);
        });
    } catch (error) {
        leaderboardList.innerHTML = `<li>Error loading leaderboard.</li>`;
        console.error("Error loading leaderboard:", error);
    }
}

// Initialize app
function init() {
    loadUserInfo();
    loadLeaderboard();
}

init();
