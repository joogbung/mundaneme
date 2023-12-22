// Words for pairs
const words = ["Train", "Car", "Bus", "Plane", "Boat", "Motorbike", "Helicopter", "Bicycle", "Truck", "Walk"];
/*  Here I've created an Array with 10 single words and next I will duplicate this Array and 
    merge into another Array which will have 10 pairs of these words
*/    

// Create an array with 10 pairs of words
const wordPairs = [...words, ...words];
/*  The "..." is called a spread operator, used to create a shallow copy of the Array called "words"
    using it twice with a comma inbetween, duplicates the Array, making 10 pairs of words instead of just 10 single words.
    So the variable "const wordPairs" will have an array of 10 pairs of words. 
*/    

//  Shuffle the word pairs
function shuffle(array) {
//  The paramater in this function is "array" and is just a placeholder
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex; 
//  Declaring "temporaryValue" and "randomIndex" but will be intialized with values in the loop 
    while (currentIndex > 1) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
/*  Math.random is a function that selects a floating point between 0 and 1 but not equal to 1 and
    that number is multiplied by the currentIndex. Math.floor rounds the answer down
    to the nearest integer.
*/      
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
/*  temporaryValue becomes the currentIndex eg. 19 then current index becomes randomIndex which is
    whatever value is calculated after the randomizing for eg. 14 then randomIndex becomes 19.
    essentially swapping index 19 value with index 14 value
*/        
    }
//  "currentIndex -= 1" decrements the current index by one in preperation for the next iteration. So 19 becomes 18 then loops again        
    return array;
//  Once the Array reaches 0 after 20 iterations, the shuffled Array is returned
}

const shuffledPairs = shuffle(wordPairs);
/*  This variable takes the shuffle function and the wordPairs Array as a parameter, which makes
    the value of "shuffledPairs" the Array of shuffled "wordPairs" */

//  Logic for the game
let openedBoxes = [];
//  "openedBoxes" variable will be used to store the values which would be random words from "wordPairs"

let chances = 3;  
//  "chances" are the amount of chances you have to win. Each incorrect pairing loses a chance 

const boxes = document.querySelectorAll(".box");
//  The const "boxes" variable uses the "document.querySelectorAll" method to select every element with the class "box"


function generateWords() {
    boxes.forEach((box, index) => {
//  "forEach" method takes up to 3 arguments "currentValue, index and array" but here only the first 2 arguments will be used        
        box.dataset.word = shuffledPairs[index];
/*  The "box.dataset.word = shuffledPairs[index];" line will set a "data-word=" attribute in the html "box". These attributes
    arent visible to the player but when the box is clicked, an event is triggered and a function will text the attribute onto
    the box making it visible. The word that will be set is based on the index of both the "shuffledPairs" Array and 
    the corresponding iteration of "const boxes". So whatever value that is index 0 of "shuffledPairs" will be set on the
    first box iterated "data-word" attribute and the cycle continues until there are no more iterations
*/
        box.addEventListener('click', () => revealBox(box));
    });

// Reveal words for 3 seconds
    boxes.forEach((box) => {
        box.textContent = box.dataset.word; 
// textContent method, gets or sets the content of an HTML element. In this case the "box" divs. The content is the word in its dataset        
    });

    setTimeout(() => {
// Hide words after 3 seconds
        boxes.forEach((box) => {
            box.textContent = '';
            //box.addEventListener('click', () => revealBox(box));
        });
    }, 3000);
}


function revealBox(box) {
    if (!openedBoxes.includes(box) && openedBoxes.length < 2) {
        openedBoxes.push(box);
        box.textContent = box.dataset.word;

        if (openedBoxes.length === 2) {
            setTimeout(() => checkMatch(), 1000);
        }
    }
}


function checkMatch() {
    const [box1, box2] = openedBoxes;

    if (box1.dataset.word !== box2.dataset.word) {
        openedBoxes = [];
        chances--;
        chancesRemaining(chances);
        
        if (chances !== 0) {
            window.alert(`No Match! ${chances} chances left.`);
            setTimeout(() => {
                box1.textContent = '';
                box2.textContent = '';
                openedBoxes = [];
            }, 0);
        }

        if (chances === 0) {
            gameOver();
        }

        
        
    } else (box1.dataset.word === box2.dataset.word) 
        openedBoxes = [];    
}

function gameOver() {
    boxes.forEach((box) => {
        box.textContent = box.dataset.word;
    })
    window.alert("GAME OVER");
}

function resetGame() {
    location.reload();
}

function chancesRemaining(chances) {
    document.getElementById('chancesDiv').innerText = "Chances Remaining: " + chances;
            
}
chancesRemaining(chances);

function howToPlay() {
    alert("Press the reset button and you are given 3 seconds to memorise as many word locations as possible before the words become hidden. Click on the boxes to reveal the word behind it, if it matches, great! find the next pair. But if it doesn't, try again. You have 3 chances to find all the pairs. If no chances remain then game over. Good luck!");

}
const howTo = document.querySelector('#howto');
howTo.addEventListener("click", howToPlay);

//  Initialize the game
generateWords();