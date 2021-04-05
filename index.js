const width = 28;
let squares = [];
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score-text');
let score = 0;
let numPacDots = 230;
let numPowerPellets = 4;
const startBtn = document.getElementById('start-btn');
const finalScoreDisplay = document.getElementById('final-score');

// a layout array which will be used to apply styles to individual squares
// 0 is pac-dot
// 1 is wall
// 2 is ghost-lair
// 3 is power-pellet
// 4 is empty
const layout = [
    1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,4,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,
    1,4,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,1,
    1,4,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,
    1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,
    1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
    1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
    1,1,3,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,1,1,
    1,1,0,1,1,1,1,1,1,4,1,1,1,2,2,1,1,1,4,1,1,1,1,1,1,0,1,1,
    1,1,0,1,1,1,1,1,1,4,1,1,2,2,2,2,1,1,4,1,1,1,1,1,1,0,1,1,
    1,1,0,1,1,1,1,1,1,4,1,1,2,2,2,2,1,1,4,1,1,1,1,1,1,0,1,1,
    1,1,0,1,1,1,1,1,1,4,1,1,2,2,2,2,1,1,4,1,1,1,1,1,1,0,1,1,
    1,1,0,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,0,1,1,
    1,1,0,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,0,1,1,
    1,1,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,3,1,1,
    1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,
    1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
    1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,1,
    1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,4,1,
    1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,4,1,
    1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,4,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1
];

// A function to draw the grid on the webpage
function createGrid() {
    for(let i = 0; i < layout.length; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        // Add the styling to each square
        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if(layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if(layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        } else if(layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }
    } 
}
createGrid();

// Draw pacman
let pacmanCurrentIndex = 489;
squares[pacmanCurrentIndex].classList.add('pacman');

// a function to control pacman and rotate him so he is facing the direction he is going
function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman');
    squares[pacmanCurrentIndex].style.transform = 'rotate(0deg)';
    switch (e.key) {
        case "ArrowRight":
            if(pacmanCurrentIndex % width < width -1 &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex +=1;
                    squares[pacmanCurrentIndex].style.transform = 'rotate(0deg)';
                }          
            break;
        case "ArrowLeft":
            if(pacmanCurrentIndex % width !== 0 &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')){
                    pacmanCurrentIndex -=1;
                    squares[pacmanCurrentIndex].style.transform = 'rotate(180deg)';
                }        
            break;
        case "ArrowUp":
            if(pacmanCurrentIndex - width >= 0 &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -=width;
                    squares[pacmanCurrentIndex].style.transform = 'rotate(-90deg)';
                }         
            if(pacmanCurrentIndex === 1) pacmanCurrentIndex = 782;
            break;
        case "ArrowDown":
            if(pacmanCurrentIndex + width < squares.length &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex +=width;
                    squares[pacmanCurrentIndex].style.transform = 'rotate(90deg)';
                }     
            if(pacmanCurrentIndex === 782) pacmanCurrentIndex = 1;     
    }
        
    squares[pacmanCurrentIndex].classList.add('pacman');
    eatPacDots();
    eatPowerPellet();
    checkForGameOver();
    checkForWin();
}
document.addEventListener('keyup', control);

// a function to eat the pacdots
function eatPacDots() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++;
        scoreDisplay.innerText = score;
        numPacDots--;
    };
};

// a function to eat the power-pellets
function eatPowerPellet() {
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        score+=10;
        scoreDisplay.innerText = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000);
        numPowerPellets--;
    };
};

// a function to unscare the ghosts
function unScareGhosts(){
    ghosts.forEach(ghost => ghost.isScared = false);
}

// Ghost class
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }   
}

// an array of new Ghosts
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 351, 350),
    new Ghost('inky', 404, 400),
    new Ghost('clyde', 407, 500)
];

// add classes to each ghost
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});
    
// put each ghost into the moveGhost() function
ghosts.forEach(ghost => moveGhost(ghost));

// a function to move each ghost
function moveGhost(ghost){
    const directions = [-1, +1, -width, width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    
    ghost.timerId = setInterval(function() {   
         if(!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost'); 
            if(ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }
        } else direction = directions[Math.floor(Math.random() * directions.length)];

        // Eat scared ghosts
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){   
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost'); 
            ghost.currentIndex = ghost.startIndex;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            score +=100;
            scoreDisplay.innerText = score;
        };      
        checkForGameOver();
    }, ghost.speed)
};

// a function to check for game over
function checkForGameOver() {
    if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
        scoreDisplay.innerText = "GAME OVER";
        finalScoreDisplay.innerText = "You scored " + score;
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
    };
};

// a fumction to check if the game is won
function checkForWin() {
    if(numPacDots === 0 && numPowerPellets === 0) {
        scoreDisplay.innerText = "YOU WIN!!";
        finalScoreDisplay.innerText = "You scored " + score;
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
    }
}

// a button to start/restart the game
startBtn.addEventListener('click', () => {
    window.location.reload();
});