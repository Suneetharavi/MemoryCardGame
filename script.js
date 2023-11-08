const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const gameContainer = document.getElementById('.game-container')
const result = document.getElementById('result')
// const controls = document.querySelector(controls-container);


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

let winCount = 0;
    movesCount = 0;

//Pick random Objects from the items array

const generateRandom = (size = 4) => {
  //Creating a temporary Array
    let tempArray = [...images];
//Initializes card values array
    let cardValues = [];
//size should be double (4*4 matrix) /2 since pais of objects would exist.
    size = (size*size) / 2;
//Random Object Selecton 
    for(let i=0; i<=size; i++){
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
    for(let i=0; i< size * size; i++){}
}

//Initialize values and func calls

const initializer = () =>{
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

initializer();







