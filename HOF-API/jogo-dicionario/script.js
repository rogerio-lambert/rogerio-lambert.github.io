const sectionMeanings = document.getElementById('meanings');
const textInteraction = document.getElementById('textInteraction');
const sectionResult = document.getElementById('result');
const tela = document.getElementById('abertura');
const interaction = document.getElementById('interacion');
const startButton = document.getElementById('start-button');
const litleBook = document.getElementById('litleBook');
let played = false;

// A função getWordMeaning resgata uma palavra de forma randòmicano dicionário
// e busca o seu significado na mesma API, retornando um objeto com estas informações
async function getWordMeaning() {
  console.log('começou a rodar');
  const word = await fetch('https://api.dicionario-aberto.net/random')
    .then((result) => result.json())
    .then((result) => result.word);
  console.log(word);
  let meaning = await fetch(`https://api.dicionario-aberto.net/word/${word}`)
    .then((result) => result.json())
  meaning = meaning[0].xml.split('<def>')[1].split('</def>')[0];
  console.log(meaning);
  return {word, meaning};
}

const adjustLayout = () => {
  const options = document.querySelectorAll('.meaning');
  options.forEach((option) => {
    option.querySelector('span.wordItem').className = 'showed';
    if (option.className.includes('right')) {
      option.style.backgroundColor = 'lightgreen';
    } else {
      option.style.backgroundColor = 'pink';
    }
  });
}

const testAnswer = (event) => {
  if (!played) {
    event.target.style.border = 'solid red 4px';

    console.log(event.target.className.includes('right'), event.target.className);
    if (event.target.className.includes('right')) {
      litleBook.src = 'bookhappy.png';
      textInteraction.innerHTML = 'Parabéns vocé acertou!!<br>Como você é inteligente!<br>Quero ver você acertar de novo!';
    } else {
      litleBook.src = 'booksad.png';
      textInteraction.innerHTML = 'Que pena, você errou...<br>Tudo bem, ninguém sabe tudo né,<br>digo, niguém além de mim né ;)<br> Tente novamete!!';
    }
    played = true;
    adjustLayout();
    startButton.style.display = 'block';
  } 

}

const createMeaningsElements = (words) => {
  const order = [0, 1, 2, 3];
  order.sort(() => Math.random() - Math.random());
  order.reverse();  
  console.log(order);
  litleBook.src = 'bookIntro.png';
  textInteraction.innerHTML = `Quero ver se você é esperto como eu!<br> Qual é a significado da palavra <br>   <b> ${words[0].word} </b> ?`
   for (let index = 0; index < words.length; index += 1) {
    const meaningElement = document.createElement('section');
    meaningElement.className = 'meaning box';
    meaningElement.addEventListener('click', testAnswer);
    const word = document.createElement('span');
    word.className = 'wordItem';
    word.innerText = words[order[index]].word;
    meaningElement.innerText = words[order[index]].meaning;
    order[index] === 0 ? meaningElement.classList.add('right') : meaningElement.classList.add('wrong');
    meaningElement.appendChild(word);
    sectionMeanings.appendChild(meaningElement);
  }
}

// A função clearDashboard é responsável por apagar os elementos de jogo da rodada
// anterior caso estes existam.
const clearDashboad = () => {
  sectionMeanings.innerHTML = '';
  textInteraction.innerHTML = '';
  sectionResult.innerHTML = '';
  startButton.style.display = 'none';
};


// A função starGame  comanda a criação do leiaute do jogo, chamando as
// funções que responsáveis por regatar os dignificados das palavras e 
// por criar os elementos html para exibir ao jogador a palavra da vez
// e os significados possíveis
async function resetGame() {
  clearDashboad();
  played = false;
  tela.style.display = '';
  const words  = [];
  for (let index = 0; index < 4; index += 1) {
    const word = await getWordMeaning();
    words.push(word);
  }  
  createMeaningsElements(words);
  tela.style.display = 'none';
}

const startGame = (event) => {
  tela.src = 'loading.png'
  resetGame();
}

// Bloco de declaração de escutadores de eventos
document.getElementById('start-button').addEventListener('click', resetGame);
document.getElementById('abertura').addEventListener('click', startGame);

