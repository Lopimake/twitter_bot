console.log("Running!")

let Twit = require('twit')

let config = require('./config')

let T = new Twit(config)

// Selects a user stream
var stream = T.stream('statuses/filter', { track: '@user_name>' });

// When someone follows me
stream.on('follow', followed)


function followed(eventMsg) {
  console.log("Following message!")
  let screenName = eventMsg.source.screen_name
  tweetMsg('Hi @' + screenName + ' thanks for following me!')
}

// Tweet random words
tweetIt()
setInterval(tweetIt, 1000 * 1000)

function tweetIt() {
  let tab = [
         "vos mots",
         "pour avoir la liste des mots merci d'ouvrir le fichier words.txt"
    ]

let r = Math.floor(Math.random()* (tab.length))
  
  let tweet = {
    status: ' ' + tab[r] + ' est un mot de merde ! '
  }

  T.post('statuses/update', tweet, tweeted)

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something wrong with the random number!")
    } else {
      console.log("Tweeted a mot!")
    }
  }
}
// Tweets thank you message
function tweetMsg(txt) {
  let tweet = {
    status: txt
  }

  T.post('statuses/update', tweet, tweeted)

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something wrong with the thank you message!")
    } else {
      console.log("Tweeted a thank you message!")
    }
  }
}


