var wins, losses, curStreak, relativePerformance, matchHistory;

export function tiltDemo(matchList, summId) {
    winsList = parseMatches(matchList, summId)
    sumWinrate = winrate(winsList);
    sumStreak = streak(winsList);

}

function winrate(winsList) {
    wins = 0; losses = 0;
    for (var result of winsList) {
        if (result = true)
            wins++;
        else
            losses++;
    }
    return (wins/losses);
}

function sumStreak(winsList) {
    lastGameResult = winsList[winsList.length() - 1];
    count = 1;
    i = winsList.length() - 2;
    while (i >= 0 && winsList[i] === lastGameResult) {
        cpunt++;
    }
    return lastGameResult ? count : -count;
}

function parseMatches(matchList, summId) {
    return matchList.map(match => parseMatchWin(match, summId));
}

function parseMatchWin(match, summId) {
    for (var player of match.participants) {
        if (player.participantId === summId)
            return player.stats.win
    }
    return false; // should never happen
}
