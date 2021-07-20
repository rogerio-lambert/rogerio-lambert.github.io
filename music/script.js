const inputUrl = document.getElementById('urlVideo');
const buttonConverter = document.getElementById('converter');
const mainSection = document.getElementById('main');
buttonConverter.addEventListener('click', () => {
  const url = inputUrl.value;
  let idVideo = '';
  if (url.includes('www.youtube.com')){
    idVideo = url.split('=')[1].split('&')[0];
  } else if (url.includes('youtu.be')) idVideo = url.substr(url.length - 11);
  document.getElementById('downloadButton')
  let downloadButtons = document.getElementById('downloadButton');
  if (downloadButtons !== null) downloadButtons.remove();
  downloadButtons = document.createElement('iframe');
  downloadButtons.src = `https://www.yt-download.org/api/button/mp3/${idVideo}`;
  downloadButtons.id = 'downloadButton';
  mainSection.appendChild(downloadButtons);
})

const get = async () => {
  const test = await fetch('https://www.yt-download.org/api/widget/MP3/lFN1bUpSKZg');
  console.log(test);
}
get();

// var unirest = require("unirest");

// var req = unirest("GET", "https://youtube-mp3-converter.p.rapidapi.com/service/run");

// req.query({
// 	"widget": "rapidapi",
// 	"action": "button",
// 	"id": "aJOTlE1K90k",
// 	"lang": "en",
// 	"format": "mp3"
// });

// req.headers({
// 	"x-rapidapi-key": "1589d1a178msh8900c17c1216edfp1ad7c4jsn6c19f586bf0e",
// 	"x-rapidapi-host": "youtube-mp3-converter.p.rapidapi.com",
// 	"useQueryString": true
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });
