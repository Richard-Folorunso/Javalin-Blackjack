const grabStats = setInterval(grabStatsAsync, 1);
async function grabStatsAsync() {
    clearInterval(grabStats);
    
    const res = await fetch(`${baseUrl}/stats-username`, {
        method: "POST",
        body: usernameCookie
    });

    if (res.status === 200) {
        const statsList = await res.json();
        for (const statsElement of statsList) {
            let pNode = document.createElement("p");
            pNode.innerHTML = `Game ID: ${statsElement.gameID} | Date: ${(new Date(statsElement.date)).toString().substring(0,15)} | ${statsElement.won == true ? "Won" : "Lost"} ${statsElement.amount} Rings`;
            document.body.appendChild(pNode);
        }
    }
}

async function submitStats() {
    const newStat = {
        username: usernameCookie,
        gameID: Math.floor(Math.random() * 2147483647),
        date: Date.now(),
        won: true,
        amount: 111
    }
    
    const res = await fetch(`${baseUrl}/stats`, {
        method: "POST",
        body: JSON.stringify(newStat)
    });

    if (res.status === 200) {
    }
}