var wins, losses, curStreak, relativePerformance, matchHistory;

function tiltDemo(matchList, summId) {
   // winsList = parseMatches(matchList, summId)
    //sumWinrate = winrate(winsList);
    //sumStreak = streak(winsList);
    return [69];
}

function totalTilt(matchList, summId) {
    var tiltval
}

function winrate(winsList) {
    var wins = 0; var losses = 0;
    for (var result of winsList) {
        if (result = true)
            wins++;
        else
            losses++;
    }
    return (wins/losses);
}

function sumStreak(winsList) {
    var lastGameResult = winsList[winsList.length - 1];
    var count = 1;
    var i = winsList.length() - 2;
    while (i >= 0 && winsList[i] === lastGameResult) {
        count++;
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
