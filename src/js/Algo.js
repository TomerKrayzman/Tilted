var wins, losses, curStreak, relativePerformance, matchHistory;

function tiltDemo(matchList, summId) {
   // winsList = parseMatches(matchList, summId)
    //sumWinrate = winrate(winsList);
    //sumStreak = streak(winsList);
    return [999];
}

function totalTilt(matchList, summId) {
    var overallTilt = 0;
    var tiltPerGame = matchList.map(match => gameTilt(match, summId));
    tiltPerGame.reverse();
    for (var i = 0; i < matchList.length; i++) { 
        overallTilt += (tiltPerGame[i] * (matchList.length - i));
    }
    return [tiltPerGame, overallTilt/matchList.length];
}

function gameTilt(match, summId) {
    for (var playerId of match.participantIdentities) {
        if (playerId.player.accountId === summId) {
            var summMatchId = playerId.participantId;
            var summWon = (summMatchId <= 5) ? (match.teams[0].win === "Win") : (match.teams[1].win === "Win");
        }
    }
    var teamBase = summMatchId <= 5 ? 1 : 6;
    var teamMatchIds = [];
    for (var i = teamBase; i <= teamBase + 4; i++) {
        if (i !== summMatchId)
            teamMatchIds.push(i);
    }
    var persPerf = performance(match, [summMatchId]);
    var teamPerf = performance(match, teamMatchIds);
    return summWon ? (teamPerf - persPerf) : (persPerf - teamPerf);
}

function performance(match, summIds) {
    var totalPerf = 0;
    for (var id of summIds) {
        totalPerf += eachPerf(getStats(match, id));
    }
    return totalPerf; // /summIds.length;
}

function getStats(match, summId) { 
    for (var partDTO of match.participants) {
        if (partDTO.participantId === summId){
            console.log(partDTO.stats);
            return partDTO.stats;
        }
    }
}

function eachPerf(stats) {
    // return summId;
    return stats.kills !== 0 ? 
            stats.kills/stats.deaths : stats.kills;
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

/* function parseMatchWin(match, summId) {
    for (var player of match.participants) {
        if (player.participantId === summId)
            return player.stats.win
    }
    return false; // should never happen
} */
