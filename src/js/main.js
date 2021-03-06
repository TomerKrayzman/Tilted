const apiKey = "RGAPI-8c74723c-38c8-4503-9132-dfef1dfaba82"

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

  let tiltArray, avgTilt
  [tiltArray, avgTilt] = totalTilt(games, aId)
  // [tiltArray, avgTilt] = dumbTilt(games, aId)
  console.log(tiltArray, avgTilt)


  function colorIntensity(n, i, a) {
    const max = 100 //Math.max(...a)
    const r = Math.ceil((n / max) * 255)
    const g = 255 - Math.ceil((n / max) * 255)
    return `rgba(${r}, 0, ${g})`
  }

  const tiltCanvas = document.querySelector('#tiltChart')
  const ctx = tiltCanvas.getContext('2d')
  const tiltChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tiltArray.map((v,i) => i + 1),
      datasets: [{
        label: "Tilt",
        pointRadius: 10,
        pointHitRadius: 0,
        pointHoverRadius: 10,
        borderColor: 'rgba(0, 200, 255, 1)',
        backgroundColor: 'rgba(0, 200, 255, 0.3)',
        data: tiltArray,
        lineTension: 0,
        pointBackgroundColor: tiltArray.map(colorIntensity)
      }]
    },
    options: {
      tooltips: {enabled: false},
      hover: {mode: null},
      layout: {
        padding: 50
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          // display: false,
          scaleLabel: {
            display: true,
            labelString: "Tilt Level"
          },
          gridLines: {display: false},
          ticks: {
            display: false,
            beginAtZero: true
          }
        }],
        xAxes: [{
          // display: false
          scaleLabel: {
            display: true,
            labelString: "Games",
          },
          gridLines: {display: false},
          ticks: {display: false}
        }]
      }
    }
  })

  avgTilt = Math.max(0, avgTilt)
  const dChart = new Chart(document.querySelector('#dChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [Math.min(50, avgTilt), Math.max(0, 50 - avgTilt)],
        backgroundColor: ['#FF0000', 'rgba(0, 0, 255, 0.3)']
      }],
      labels: ['Tilt', 'Chill']
    },
    options: {
      tooltips: {enabled: false},
      hover: {mode: null},
      legend: {display: false},
    }
  })
})