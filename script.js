const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const gameContainer = document.getElementById('.game-container')
const result = document.getElementById('result')
const controls = document.querySelector(controls-container);


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
    {name : 'perscholas' , image: "perscholas"}
]

let winCount = 0;
    movesCount = 0;

//Pick random Objects from the items array

const generateRandom = (size = 4) => {

    let tempArray = [...items];

    let cardValues = [];

    size = (size*size) / 2;

    for(let i=0; i<=size; i++){
        const randomIndex = Math.floor(MAth.random() * tempArray.length);

        cardValues.push(tempArray[randomIndex]);

        tempArray.splice(randomIndex, 1);
    }
 return cardValues;
}



