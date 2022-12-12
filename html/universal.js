const baseUrl = "http://localhost:8080";
const usernameCookie = document.cookie.split("=")[1];
let userObject;
jackWelcome.innerHTML = `Welcome ${usernameCookie},`;
jackLogoutButton.addEventListener('click', jackLogout);
jackBlackJackButton.addEventListener('click', jackBlackJack);
jackGameStatsButton.addEventListener('click', jackGameStats);
jackDepositButton.addEventListener('click', jackDepositPage);
jackReferralsButton.addEventListener('click', jackReferrals);

if (usernameCookie === undefined) {
    window.location.href = "./";
}

window.onload = async function() {
    const res = await fetch(`${baseUrl}/get-user`, {
        method: "POST",
        body: usernameCookie
    });

    if (res.status === 200) {
        userObject = await res.json();
        //console.log(userObject);
        jackRings.innerHTML = `Rings: ${userObject.rings}`;
    }
}

function jackLogout() {
    document.cookie = `jackUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = "./";
}

function jackBlackJack() {
    window.location.href = "./black-jack.html";
}

function jackGameStats() {
    window.location.href = "./game-stats.html";
}

function jackDepositPage() {
    window.location.href = "./deposit.html";
}

function jackReferrals() {
    window.location.href = "./referrals.html";
}