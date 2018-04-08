const apiKey = "RGAPI-09105804-5cbb-49dc-9071-83d9d7c15779"

const apiBase = "https://loltilted.com/api"
const summonerByNameUri = (sname) => `${apiBase}/lol/summoner/v3/summoners/by-name/${sname}?api_key=${apiKey}`
const summonerById = (id) => `${apiBase}/lol/summoner/v3/summoners/${id}?api_key${apiKey}`
const matchList = (accountId) => `${apiBase}/lol/match/v3/matchlists/by-account/${accountId}?api_key=${apiKey}`
const matchById = (id) =>  `${apiBase}/lol/match/v3/matches/${id}?api_key=${apiKey}`
const recentMatches = (accountId) => 
  `${apiBase}/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${apiKey}`
const lastNMatches = (accountId, N) => 
  `${apiBase}/lol/match/v3/matchlists/by-account/${accountId}?endIndex=${N}&api_key=${apiKey}`

document.querySelector('#setName').addEventListener('click', async () => {
  const snameInput = document.querySelector('#summonerName')
  const matchesInput = document.querySelector('#matchNumber')
  const sname = snameInput.value
  const nMatches = matchesInput.value
  console.log("Got summoner name:", sname)

  // TODO: Input sanitization
  let xhr = new XMLHttpRequest()
  xhr.open('GET', summonerByNameUri(sname), false) // syncronous request
  xhr.send()
  
  // TODO: Error/sanity checks
  const res = JSON.parse(xhr.responseText)
  console.log(res)
  const aId = res.accountId
  xhr = new XMLHttpRequest()
  xhr.open('GET', lastNMatches(aId, nMatches), false)
  xhr.send()
  const matches = JSON.parse(xhr.response)
  console.log(matches)
  const games = await Promise.all(matches.matches.map(async x => {
    const r = new XMLHttpRequest()
    r.open('GET', matchById(x.gameId), false)
    r.send()
    return JSON.parse(r.responseText)
  }))

  console.log(games)

  tiltArray = tiltDemo(games, aId)
  console.log(tiltArray)

  const tiltCanvas = document.querySelector('#tiltChart')
  const ctx = tiltCanvas.getContext('2d')
  const tiltChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: "Tilt",
        data: [1, 5, 4, 7, 10, 4],
        steppedLine: true,
      }]
    },
    options: {
      legend: {

      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
})