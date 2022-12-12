let currentValue = 0;
jackPlayButton.addEventListener('click', jackStartBlackJack);

async function jackStartBlackJack() {
    jackPlayButton.remove();
    jackWagerAmount.readOnly = true;
    const pNode = document.createElement("p");
    pNode.setAttribute("id", "jackGameCurrentValue");
    pNode.innerHTML = `Current Value: ${currentValue}`;
    document.body.appendChild(pNode);

    const deckID = await jackGrabDeckID();
    //const deckID = "n1mchl8zmcg0";

    let buttonNode = document.createElement("button");
    buttonNode.innerHTML = "Hit";
    buttonNode.addEventListener('click', jackGameHit);
    buttonNode.deckID = deckID;
    buttonNode.setAttribute("id", "jackGameHitButton");
    document.body.appendChild(buttonNode);
    buttonNode = document.createElement("button");
    buttonNode.innerHTML = "Stand";
    buttonNode.addEventListener('click', jackGameStand);
    buttonNode.setAttribute("id", "jackGameStandButton");
    document.body.appendChild(buttonNode);
    document.body.appendChild(document.createElement("br"));

    let playingCard = await jackDrawCard(deckID);
    let playingCardImage = document.createElement("IMG");
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);
    document.body.appendChild(playingCardImage);

    currentValue += (isNaN(playingCard.cards[0].value) ? 10 : Number(playingCard.cards[0].value));
    jackGameCurrentValue.innerHTML = `Current Value: ${currentValue}`;

    playingCard = await jackDrawCard(deckID);
    playingCardImage = document.createElement("IMG");
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);
    document.body.appendChild(playingCardImage);

    currentValue += (isNaN(playingCard.cards[0].value) ? 10 : Number(playingCard.cards[0].value));
    jackGameCurrentValue.innerHTML = `Current Value: ${currentValue}`;
}

async function jackGrabDeckID()  {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    if (res.status === 200) {
        const data = await res.json();
        return data.deck_id;
    }
}

async function jackDrawCard(deckID)  {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    if (res.status === 200) {
        const data = await res.json();
        return data;
    }
}

async function jackGameHit()  {
    const playingCard = await jackDrawCard(event.currentTarget.deckID);
    const playingCardImage = document.createElement("IMG");
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);
    document.body.appendChild(playingCardImage);

    currentValue += (isNaN(playingCard.cards[0].value) ? 10 : Number(playingCard.cards[0].value));
    jackGameCurrentValue.innerHTML = `Current Value: ${currentValue}`;

    if (currentValue > 21) {
        jackGameHitButton.disabled = true;
        jackGameStandButton.disabled = true;
        jackGameCurrentValue.innerHTML += ", Bust!"

        const newStat = {
            username: usernameCookie,
            gameID: Math.floor(Math.random() * 2147483647),
            date: Date.now(),
            won: false,
            amount: jackWagerAmount.valueAsNumber
        }
        
        const res = await fetch(`${baseUrl}/stats`, {
            method: "POST",
            body: JSON.stringify(newStat)
        });

        const restwo = await fetch(`${baseUrl}/deposit`, {
            method: "POST",
            body: `${usernameCookie},-${jackWagerAmount.value}`
        });
    }
}

async function jackGameStand() {
    jackGameHitButton.disabled = true;
    jackGameStandButton.disabled = true;
    let dealerCurrentValue = 0;
    let pNode = document.createElement("p");
    pNode.setAttribute("id", "jackGameDealerValue");
    pNode.innerHTML = `Dealer's Current Value: ${dealerCurrentValue}`;
    document.body.appendChild(pNode);
    while (dealerCurrentValue < Math.min(currentValue, 17)) {
        dealerCurrentValue += Math.floor(Math.random() * 10);
        jackGameDealerValue.innerHTML = `Dealer's Current Value: ${dealerCurrentValue}`;
        await new Promise(r => setTimeout(r, 250));
    }

    if (dealerCurrentValue < 21) {
        jackGameDealerValue.innerHTML += ", Dealer Stands."
    }
    else if (dealerCurrentValue > 21) {
        jackGameDealerValue.innerHTML += ", Dealer Bust!"
    }

    pNode = document.createElement("p");
    if (currentValue >= dealerCurrentValue || dealerCurrentValue > 21) {
        pNode.innerHTML = `You won!`;

        const newStat = {
            username: usernameCookie,
            gameID: Math.floor(Math.random() * 2147483647),
            date: Date.now(),
            won: true,
            amount: jackWagerAmount.valueAsNumber
        }
        
        const res = await fetch(`${baseUrl}/stats`, {
            method: "POST",
            body: JSON.stringify(newStat)
        });

        const restwo = await fetch(`${baseUrl}/deposit`, {
            method: "POST",
            body: `${usernameCookie},${jackWagerAmount.value}`
        });
    } else {
        pNode.innerHTML = `You lost...`;

        const newStat = {
            username: usernameCookie,
            gameID: Math.floor(Math.random() * 2147483647),
            date: Date.now(),
            won: false,
            amount: jackWagerAmount.valueAsNumber
        }
        
        const res = await fetch(`${baseUrl}/stats`, {
            method: "POST",
            body: JSON.stringify(newStat)
        });

        const restwo = await fetch(`${baseUrl}/deposit`, {
            method: "POST",
            body: `${usernameCookie},-${jackWagerAmount.value}`
        });
    }
    document.body.appendChild(pNode);
}