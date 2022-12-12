const updateRC = setInterval(UpdateReferralCode, 50);
jackReferralCodeButton.addEventListener('click', jackReferralCodeCopy);

function UpdateReferralCode() {
    if (userObject != undefined) {
        clearInterval(updateRC);
        jackReferralCodeValue.value = userObject.referralCode;
        if (userObject.referralList != undefined) {
            const referralList = userObject.referralList.split(',');
            jackTotalReferralBonus.innerHTML = `Total Referral Bonus: ${(referralList.length - 1) * 500}`;
            jackReferralNames.innerHTML = `Your Referrals: ${userObject.referralList.substring(5)}`
        } else {
            jackTotalReferralBonus.innerHTML = `Total Referral Bonus: 0`;
            jackReferralNames.innerHTML = ``
        }
    }
}

function jackReferralCodeCopy() {
    jackReferralCodeValue.select();
    navigator.clipboard.writeText(jackReferralCodeValue.value);
}