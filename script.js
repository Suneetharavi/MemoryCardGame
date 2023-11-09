const gameContainer = document.querySelector(".game-container");
const moves = document.getElementById("moves-count");
const player = document.getElementById("player");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const playing = document.getElementById("overlay")

const displayScore1 = document.querySelector('#score1');
const displayScore2 = document.querySelector('#score2');

let score1 = 0;
let score2 = 0;
let p1Turn = true;
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Images array

const images = [
    {name : 'cat' , image: "cat.jpg"},
    {name : 'tom' , image: "tom.jpg"},
    {name : 'map' , image: "map.jpg"},
    {name : 'rose' , image: "rose.jpg"},
    {name : 'sun' , image: "sun.jpg"},
    {name : 'dog' , image: "dog.jpg"},
    {name : 'christmas' , image: "chrismas.jpg"},
    {name : 'perscholas' , image: "perscholas.jpg"},
    {name : 'rainbow' , image: "rainbow.jpg"},
    {name : 'nature' , image: "rainbows.jpg"},
    {name : 'peacock' , image: "peacock.jpg"}
];
//console.log(images);
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;
//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  //display time using innerHTML
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  if((minutesValue) === 2){
    alert('Time is Up');
    // setTimeout(stopGame,1000);
    checkGameOver(); // game is over if either player gets 28 points

    stopGame();
  }
  
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the images array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...images];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    //Generating random images
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    //console.log(randomIndex)
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    //clearing the innerHTML to display fresh
  gameContainer.innerHTML = "";
  //creating same images of cardValues images(creating 2 images of same type)
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  //Displaying all 16 images (8 +8)
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
//   //Grid, pack in as many columns (fit to size) into a grid row before it wraps to a new line
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //Cards
  cards = document.querySelectorAll(".card-container");
  //Adding EventListeners to each click on the card.
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
            isBoardClosed = true;
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            
            if (p1Turn) {
                score1 +=2;
                displayScore1.textContent = score1.toString();
            }
            else {
                score2 +=2;
                displayScore2.textContent = score2.toString();
            }
            //console.log(winCount);
            if (winCount == Math.floor(cardValues.length / 2)) {
                setTimeout( checkGameOver,2000);
            //   result.innerHTML = `<h2>You Won</h2>
            // <h4>Moves: ${movesCount}</h4>`;
               setTimeout(stopGame,2000);
           }
           
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);

            if (p1Turn){
                p1Turn = false;
            }
            else if (!p1Turn){
                p1Turn = true;
            }
          }
        }
      }
    });
  });
};
//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls and buttons visibility (hide is the class name of stop button in wrapper)
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
//Restart game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(100);
  })
);
//Initialize values and func calls
const initializer = () => {
//Clearing the score for next game
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

function checkGameOver(){ // game is over if either player gets 28 points
    if (score1 > score2){
       alert("CONGRATULATIONS PLAYER ONE!");
    //    stopGame();
       location.reload();
    }
    else if (score2 > score1){
       alert("CONGRATULATIONS PLAYER TWO!");
    //    stopGame();
       location.reload();
    }
    else if(score1 === score2)
    alert("Draw match")
    location.reload();
 }

//  function on(player1) {
//     document.getElementById("overlay").style.display = "block";
//   }
  
//   function off() {
//     document.getElementById("overlay").style.display = "none";
//   }








