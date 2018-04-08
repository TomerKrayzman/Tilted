const factors = [
  (m, id) => {
    let tilt = 0
    m.participantIdentities.filter(x => x.player.accountId === id).forEach(x => {
      const p = m.participants[x.participantId - 1]
      if (!p.stats.win) tilt += 50
      tilt += p.stats.deaths * 5
      tilt -= p.stats.kills * 2
      tilt -= p.stats.assists
    })
    return Math.max(tilt, 0)
  }
]

function dumbTilt(matches, accId) {
  const dTilts = []
  for (m of matches) {
    let tilt = 0
    for (f of factors) {
      tilt += f(m, accId)
    }
    dTilts.push(tilt)
  }
  return [dTilts, dTilts.reduce((x,y) => x + y) / dTilts.length]
}