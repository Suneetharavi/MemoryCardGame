const gameContainer = document.querySelector('.game-container')
const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const result = document.getElementById('result')
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondcard = false;

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
]
//Initial Time
let seconds = 0;
let minutes = 0;
//Initial Count
let winCount = 0;
let movesCount = 0;

//For Timer 
const timeGenerator = () =>{
    seconds += 1;
    //For minutes logic
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }

    //Format time before displaying

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}
//Pick random Objects from the items array

const generateRandom = (size = 4) => {
  //Creating a temporary Array
    let tempArray = [...images];
//Initializes card values array
    let cardValues = [];
//size should be double (4*4 matrix) /2 since pais of objects would exist.
    size = (size*size) / 2;
//Random Object Selecton 
    for(let i=0; i<size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);

        cardValues.push(tempArray[randomIndex]);
//Once selected remove the object from temp Array
        tempArray.splice(randomIndex, 1);
    }
 return cardValues;
}

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues]
    //shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for(let i=0; i< size * size; i++){
            //Create cards before => Front side (contains question mark)
            //after => back side (contains actual image)
            //data-card-values stores the names of the cards to match later
        gameContainer.innerHTML += `
        <div class = "card-container" data-card-value="${cardValues[i].name}">
            <div class = "card-before">?</div>
            <div class = "card-after"><img src="${cardValues[i].image}" class="image" />
        </div>
        `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`; 

    //Cards
    cards = document.querySelectorAll(".card-container");
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
            //increment moves since user selected second card
            movesCounter();
            //secondCard and value
            let secondCard = card;
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
              if (winCount == Math.floor(cardValues.length / 2)) {
                result.innerHTML = `<h2>You Won</h2>
              <h4>Moves: ${movesCount}</h4>`;
                stopGame();
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
            }
          }
        }
      });
    });
  };
    


//Initialize values and func calls

const initializer = () =>{
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

//Stop game
stopButton.addEventListener(
    "click",
    (stopGame = () => {
      controls.classList.remove("hide");
      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      clearInterval(interval);
    })
  );
// initializer();







