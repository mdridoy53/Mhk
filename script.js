// Simulated Data (You can replace with real API calls)
let points = 0;
let clicks = 0; // Track number of clicks in the last minute
let lastClickTime = 0; // Store last click time
let dailyClickLimit = 35; // Max daily clicks
let dailyClickCount = 0; // Track clicks for the day
let sessionStartTime = Date.now(); // Track user session time
let user = { id: 1, username: "user1" };

// Ad slots array (with version info and different URLs per version)
let ads = {
    v1: [
        "https://www.effectiveratecpm.com/z0hair4i?key=52993e542fe1abed7e17dca47793a91b",
        "https://www.effectiveratecpm.com/z0hair4i?key=52993e542fe1abed7e17dca47793a91c"
    ],
    v2: [
        "https://www.effectiveratecpm.com/z0hair4i?key=2f93a542fe1abed7e17dca47793a91b",
        "https://www.effectiveratecpm.com/z0hair4i?key=2f93a542fe1abed7e17dca47793a91c"
    ],
    v3: [
        "https://www.effectiveratecpm.com/z0hair4i?key=3d83b542fe1abed7e17dca47793a91b",
        "https://www.effectiveratecpm.com/z0hair4i?key=3d83b542fe1abed7e17dca47793a91c"
    ]
};

// Initialize leaderboard
let leaderboard = [
    { username: "user1", points: 100 },
    { username: "user2", points: 80 },
    { username: "user3", points: 60 },
    { username: "user4", points: 50 },
];

// Track user clicks and interactions
let adInteractions = {
    v1: 0,
    v2: 0,
    v3: 0
};

// Theme management
let isDarkMode = false;

// Displaying user info
document.getElementById('user-info').textContent = `Logged in as: ${user.username}`;

// Leaderboard
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear current list

    leaderboard.sort((a, b) => b.points - a.points); // Sort by points in descending order

    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.username}: ${entry.points} points`;
        leaderboardList.appendChild(li);
    });
}

updateLeaderboard(); // Initial leaderboard update

// Function to load ads dynamically based on version selected
function loadAdsBasedOnVersion() {
    const selectedVersion = document.getElementById('ad-version').value;
    loadAds(selectedVersion);
}

// Function to load ads dynamically into ad slots
function loadAds(version = 'v1') {
    const adFrames = document.querySelectorAll('.ad-slot');
    const selectedAds = ads[version];

    adFrames.forEach((frame, index) => {
        // Dynamically set the ad URL for each slot
        frame.src = selectedAds[index % selectedAds.length]; // Cycle through ads based on selected version
    });

    // Track the ad version interactions
    adInteractions[version] += 1;
    console.log(`Ad Version ${version} shown: ${adInteractions[version]} times.`);
}

// Function to track ad click and reward points
function trackAdClick() {
    const currentTime = Date.now();
    const timePassed = (currentTime - lastClickTime) / 1000; // Time passed in seconds

    if (timePassed < 60) {
        // If the user clicked an ad less than a minute ago
        if (clicks >= 35) {
            const minutesRemaining = Math.floor((60 - timePassed) / 60);
            const secondsRemaining = Math.floor((60 - timePassed) % 60);
            document.getElementById('reminder-message').textContent = `You can click again in ${minutesRemaining} minute(s) and ${secondsRemaining} second(s).`;
            return;
        }
    } else {
        // Reset click count if a minute has passed
        clicks = 0;
    }

    // Track daily click limit
    if (dailyClickCount >= dailyClickLimit) {
        alert("You've reached your daily click limit!");
        return;
    }

    points += 10; // Reward 10 points for clicking
    dailyClickCount += 1; // Increment daily click count
    clicks += 1; // Increment the number of clicks
    lastClickTime = currentTime; // Update the last click time
    document.getElementById('points').textContent = points;
    updateLeaderboard(); // Update leaderboard with new points

    document.getElementById('reminder-message').textContent = `You've earned 10 points!`;

    alert("You've earned 10 points for clicking the ad!");
}

// Function to simulate withdrawing points
function withdrawPoints() {
    if (points > 0) {
        alert(`You have successfully withdrawn ${points} points!`);
        points = 0; // Reset points after withdrawal
        document.getElementById('points').textContent = points;
    } else {
        alert("You don't have any points to withdraw.");
    }
}

// Toggle Dark Mode
function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById
