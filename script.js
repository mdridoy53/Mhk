// Initialize Telegram WebApp
Telegram.WebApp.expand();

let user = Telegram.WebApp.initDataUnsafe.user;
let userId = user ? user.id : "Guest";

// Display user info
document.getElementById("user-name").innerText = user ? user.first_name : "Guest";

// Referral Tracking
let urlParams = new URLSearchParams(window.location.search);
let referrerId = urlParams.get("ref");

// Check if user is referred and give referral bonus
if (referrerId && !localStorage.getItem(`referral_${userId}`)) {
    let referrerPoints = localStorage.getItem(`points_${referrerId}`) || 0;
    referrerPoints = parseInt(referrerPoints) + 1000; // Add 1000 points to referrer
    localStorage.setItem(`points_${referrerId}`, referrerPoints);
    localStorage.setItem(`referral_${userId}`, "true"); // Mark as referred
}

// Function to reset daily limits
function resetDailyLimits() {
    let lastReset = localStorage.getItem(`lastReset_${userId}`);
    let today = new Date().toDateString();

    if (lastReset !== today) {
        localStorage.setItem(`lastReset_${userId}`, today);
        localStorage.setItem(`clicks_${userId}`, 0);
        localStorage.setItem(`spin_${userId}`, "false");
    }
}

// Reset limits when the app loads
resetDailyLimits();

// Fetch stored values
let points = localStorage.getItem(`points_${userId}`) ? parseInt(localStorage.getItem(`points_${userId}`)) : 0;
let clicksToday = parseInt(localStorage.getItem(`clicks_${userId}`)) || 0;
let hasSpun = localStorage.getItem(`spin_${userId}`) === "true";

document.getElementById("points").innerText = points;
document.getElementById("clicks-left").innerText = 20 - clicksToday;

// Function to track ad clicks
function trackAdClick() {
    if (clicksToday >= 20) {
        alert("You've reached your daily limit of 20 ad clicks!");
        return;
    }

    points += 10; // Increase points by 10 per click
    clicksToday++;
    localStorage.setItem(`points_${userId}`, points);
    localStorage.setItem(`clicks_${userId}`, clicksToday);

    document.getElementById("points").innerText = points;
    document.getElementById("clicks-left").innerText = 20 - clicksToday;
}

// Function for daily spin (1 spin per day)
function spinWheel() {
    if (hasSpun) {
        alert("You've already used your daily spin!");
        return;
    }

    let spinPoints = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Random 10-50 points
    points += spinPoints;
    hasSpun = true;

    localStorage.setItem(`points_${userId}`, points);
    localStorage.setItem(`spin_${userId}`, "true");

    document.getElementById("points").innerText = points;
    alert(`🎉 You won ${spinPoints} points!`);
}

// Function to withdraw points
function withdrawPoints() {
    if (points >= 10000) {
        alert(`Success! You withdrew ${points} points.`);
        points = 0; // Reset points after withdrawal
        document.getElementById("points").innerText = points;
        localStorage.setItem(`points_${userId}`, points);
    } else {
        alert("You need at least 10,000 points to withdraw!");
    }
}

// Function to generate referral link
function copyReferralLink() {
    let referralLink = `https://t.me/Wstokenbot?start=${userId}`;
    document.getElementById("referral-link").value = referralLink;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
}

// Function to update leaderboard with top earners
function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [
        { name: "Alice", points: 5000 },
        { name: "Bob", points: 3500 },
        { name: "Charlie", points: 2000 }
    ];

    leaderboard.push({ name: user.first_name || "You", points }); // Add user to leaderboard

    leaderboard.sort((a, b) => b.points - a.points); // Sort by highest points

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    leaderboard.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = `#${index + 1} ${user.name}: ${user.points} points`;
        leaderboardList.appendChild(li);
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); // Save leaderboard
}

// Initialize referral link
copyReferralLink();

// Update leaderboard on page load
updateLeaderboard();
