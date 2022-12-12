const baseUrl = "http://localhost:8080";
jackLoginButton.addEventListener('click', jackLogin);

async function jackLogin() {
    jackLoginButton.innerHTML = "Logging In...";
    jackLoginButton.disabled = true;

    const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        body: `${jackUsername.value.trim()},${jackReferralCode.value.trim()}`
    });

    if (res.status === 200) {
        document.cookie = `jackUsername=${jackUsername.value.trim()}; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;`;
        window.location.href = "./black-jack.html";
    }
}