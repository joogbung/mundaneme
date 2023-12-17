// Words for pairs
const words = ["Train", "Car", "Bus", "Plane", "Boat", "Motorbike", "Helicopter", "Bicycle", "Truck", "Walk" ];
/*  Here I've created an Array with 10 single words and next I will duplicate this Array and 
    merge into another Array which will have 10 pairs of these words
*/    

// Create an array with 10 pairs of words
const wordPairs = [...words, ...words];
/*  The "..." is called a spread operator, used to create a shallow copy of the Array called "words"
    using it twice with a comma inbetween, duplicates the Array, making 10 pairs of words instead of just 10 single words.
    So the variable "const wordPairs" will have an array of 10 pairs of words. 
*/    

// Shuffle the word pairs
function shuffle(array) {
// The paramater in this function is "array" and is just a placeholder
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex; 

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        
    }
    return array;
}

const shuffledPairs = shuffle(wordPairs);

// Logic for the game
let openedBoxes = [];
let chances = 3; 

const boxes = document.querySelectorAll(".box");

function generateWords() {
    boxes.forEach((box, index) => {
        // Initially hide words by adding a data attribute
        box.dataset.word = shuffledPairs[index];
        box.addEventListener('click', () => revealBox(box));
    });

    // Reveal words for 2 seconds
    boxes.forEach((box) => {
        box.textContent = box.dataset.word; // Reveal word
    });

    setTimeout(() => {
        // Hide words after 2 seconds
        boxes.forEach((box) => {
            box.textContent = '';
            box.addEventListener('click', () => revealBox(box));
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

    if (box1.dataset.word === box2.dataset.word) {
        openedBoxes = [];
        chances--;

        if (chances >= 0) {
            window.alert(`Match found! ${chances} chances left.`);
        }

        if (chances === 0) {
            gameOver();
        }
    } else {
        setTimeout(() => {
            box1.textContent = '';
            box2.textContent = '';
            openedBoxes = [];
        }, 1000);
    }
}

function gameOver() {
    window.alert("GAME OVER");
}

// Initialize the game
generateWords();