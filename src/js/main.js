const apiKey = "RGAPI-09105804-5cbb-49dc-9071-83d9d7c15779"

/*
const apiBase = "https://loltilted.com/api"
const summonerByNameUri = (sname) => `${apiBase}/lol/summoner/v3/summoners/by-name/${sname}`
const summonerById = (id) => `${apiBase}/lol/summoner/v3/summoners/${id}`

document.querySelector('#sname-but').addEventListener('click', () => {
  const snameInput = document.querySelector('#sname-input')
  const sname = snameInput.value
  console.log("Got summoner name:", sname)

  // TODO: Input sanitization
  const xhr = new XMLHttpRequest()
  xhr.open('GET', summonerByNameUri(sname), false) // syncronous request
  // xhr.setRequestHeader("Origin", null)
  // xhr.setRequestHeader("Accept-Charset", "application/x-www-form-urlencoded; charset=UTF-8")
  xhr.setRequestHeader("X-Riot-Token", "RGAPI-09105804-5cbb-49dc-9071-83d9d7c15779")
  // xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5")
  // xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0")
  xhr.send()
  
  // TODO: Error/sanity checks
  const res = xhr.response
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

  let tiltArray = tiltDemo(games, aId)
  console.log(tiltArray)

  */

  function colorIntensity(n, i, a) {
    const max = 100 //Math.max(...a)
    const r = Math.ceil((n / max) * 255)
    const g = 255 - Math.ceil((n / max) * 255)
    return `rgba(${r}, 0, ${g})`
  }

  // OVERRIDE TILTARRAY TODO: User actual data
  let tiltArray = [1, 5, 4, 7, 10, 4]

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
//})