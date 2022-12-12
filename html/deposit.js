jackMakeDepositButton.addEventListener('click', jackMakeDeposit);
jackMakeWithdrawalButton.addEventListener('click', jackMakeWithdrawal);

async function jackMakeDeposit() {
    jackMakeDepositButton.innerHTML = "Depositing...";
    jackMakeDepositButton.disabled = true;
    jackMakeWithdrawalButton.disabled = true;

    const res = await fetch(`${baseUrl}/deposit`, {
        method: "POST",
        body: `${usernameCookie},${jackAmount.value}`
    });

    if (res.status === 200) {
        window.location.href = "./deposit.html";
    }
}

async function jackMakeWithdrawal() {
    jackMakeWithdrawalButton.innerHTML = "Withdrawaling...";
    jackMakeDepositButton.disabled = true;
    jackMakeWithdrawalButton.disabled = true;

    const res = await fetch(`${baseUrl}/deposit`, {
        method: "POST",
        body: `${usernameCookie},-${jackAmount.value}`
    });

    if (res.status === 200) {
        window.location.href = "./deposit.html";
    }
}