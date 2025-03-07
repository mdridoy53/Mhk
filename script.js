// Simulated Data (You can replace with real API calls)
let points = 0;
let clicks = 0; // Track number of clicks in the last minute
let lastClickTime = 0; // Store last click time
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

// Function to load ads dynamically into ad 
