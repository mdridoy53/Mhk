let tg = window.Telegram.WebApp;
let botToken = "7434724514:AAFFnQVe6ySE8pd--i40xjf-CaB66iXFSs4";
let chatId = tg.initDataUnsafe?.user?.id;

if (tg) {
    tg.expand();

    function applyTheme() {
        if (tg.colorScheme === "dark") {
            document.documentElement.style.setProperty("--bg-color", "#1e1e1e");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            document.documentElement.style.setProperty("--button-bg", "#0088cc");
            document.documentElement.style.setProperty("--card-bg", "#2b2b2b");
        }
    }
    applyTheme();

    let user = tg.initDataUnsafe.user;
    if (user) {
        document.getElementById("user-info").innerHTML = `
            👤 <b>${user.first_name} ${user.last_name || ""}</b> <br>
            🆔 ID: ${user.id} <br>
            🌎 Language: ${user.language_code}
        `;
    }
}

let userPoints = localStorage.getItem("userPoints") || 0;
document.getElementById("points").innerText = userPoints;

let ads = [
    "https://www.effectiveratecpm.com/z0hair4i?key=52993e542fe1abed7e17dca47793a91b",
    "https://www.effectiveratecpm.com/bggsk5vw75?key=8d53f96d98f16174203e37a574ca54b3",
    "https://www.effectiveratecpm.com/ruv9nxd3?key=4c33ae928c7569dcc8d4c8276e6fe339"
];
let currentAdIndex = 0;

function rotateAds() {
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    document.getElementById("ad-frame").src = ads[currentAdIndex];
}
setInterval(rotateAds, 8000);

function trackAdClick() {
    tg.openLink(ads[currentAdIndex]);

    userPoints = parseInt(userPoints) + 10;
    localStorage.setItem("userPoints", userPoints);
    document.getElementById("points").innerText = userPoints;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: `✅ Ad Clicked!\n🔹 User: ${chatId}\n🏆 Earned: 10 Points`
        })
    });

    alert("✅ Click recorded! You earned 10 points!");
    fetchLeaderboard();
}

function withdrawPoints() {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: `💰 Withdrawal Request!\n🔹 User: ${chatId}\n💵 Points: ${userPoints}`
        })
    });

    alert("💳 Withdrawal request sent!");
}

function fetchLeaderboard() {
    fetch(`https://api.telegram.org/bot${botToken}/getLeaderboard`)
    .then(response => response.json())
    .then(data => {
        let leaderboardList = document.getElementById("leaderboard-list");
        leaderboardList.innerHTML = data.map((user, index) => 
            `<li>${index + 1}. ${user.name} - ${user.points} points</li>`
        ).join("");
    })
    .catch(error => console.error("Error loading leaderboard:", error));
}
fetchLeaderboard();
