const apiKey = "RGAPI-09105804-5cbb-49dc-9071-83d9d7c15779"

const apiBase = "https://loltilted.com/api"
const summonerByNameUri = (sname) => `${apiBase}/lol/summoner/v3/summoners/by-name/${sname}?${apiKey}`
const summonerById = (id) => `${apiBase}/lol/summoner/v3/summoners/${id}?${apiKey}`

document.querySelector('#sname-but').addEventListener('click', () => {
  const snameInput = document.querySelector('#sname-input')
  const sname = snameInput.value
  console.log("Got summoner name:", sname)

  // TODO: Input sanitization
  const xhr = new XMLHttpRequest()
  xhr.open('GET', summonerByNameUri(sname), false) // syncronous request
  // xhr.setRequestHeader("Origin", null)
  // xhr.setRequestHeader("Accept-Charset", "application/x-www-form-urlencoded; charset=UTF-8")
  // xhr.setRequestHeader("X-Riot-Token", "RGAPI-09105804-5cbb-49dc-9071-83d9d7c15779")
  // xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5")
  // xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0")
  xhr.send()
  
  // TODO: Error/sanity checks
  const res = xhr.response
  console.log(res)
})