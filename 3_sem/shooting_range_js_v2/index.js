
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//КОНСТАНТЫ
const SPEED = 10; //10px in 500 milliseconds
const STEP = SPEED+3;
const GAME_INTERVAL = 500;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let blasterOpt;
let blaster;
let ship;
let space;
let score = 0;
let millenniumFalcon; //сокол тысечелетия
let mousePositionX=0;
let mousePositionY=0;
let lastBlasterPositionX = 0;
let lastBlasterPositionY = 0;
let interval;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Ship {

    constructor(life,hero,heroIMG) {
        this.life = life,
        this.ship = hero,
        this.shipIMG = heroIMG,
        this.shipPositions = this.ship.getBoundingClientRect();
    }
    
    startLife() {
        this.lineLife = document.getElementById('lineLife').style;
        this.procentOfLife = 100/this.life;
        this.lineLife.width = `${this.procentOfLife*this.life}%`
    }

    startPositionOfShip() {
        this.lastShipPositionX = space.width/2 - this.shipPositions.width/2;
        this.lastShipPositionY = space.height/2 - this.shipPositions.height/2;
        this.ship.style.left = `${this.lastShipPositionX}px`;
        this.ship.style.top = `${this.lastShipPositionY}px`;
    }

    flying() {
        //Новые пути
        let newPathX = this.newRandomPath();
        let newPathY = this.newRandomPath();

        for (let time = 0; time < GAME_INTERVAL; time+=50) {
            //Передвижение
            setTimeout(() => {
                let newShipPositionX = this.lastShipPositionX + newPathX;
                let newShipPositionY = this.lastShipPositionY + newPathY;
  
                while (newShipPositionX < 0 || newShipPositionX > space.width - this.shipPositions.width) {
                    newPathX = this.newRandomPath();
                    newShipPositionX = this.lastShipPositionX + newPathX;
                }
                
                while (newShipPositionY < 0 || newShipPositionY > space.height - this.shipPositions.height) {
                    newPathY = this.newRandomPath();
                    newShipPositionY = this.lastShipPositionY + newPathY;
                }
                
                this.shipIMG.style.transform = `rotate(${this.rotateTo(newPathX, newPathY)}deg)`;

                this.ship.style.left = `${newShipPositionX}px`;
                this.ship.style.top = `${newShipPositionY}px`;

                this.lastShipPositionX = newShipPositionX;
                this.lastShipPositionY = newShipPositionY;
                
                //Обновляю позиции животного
                this.shipPositions = this.ship.getBoundingClientRect();
            }, time);
        }
    }

    newRandomPath() {
        let newPath = [-SPEED, 0, SPEED];
        return newPath[Math.floor(Math.random() * 3)]; 
    }

    isDestroyed() {
        if (this.life <= 0) {
            return true
        }
    }

    hit() {
        this.shots()
        if (this.isShootMe()) {
            this.life--;
            this.lineLife.width = `${this.procentOfLife*this.life}%`;
        }

        if (this.isDestroyed()) {
            gameOver();
        }

    }

    shots() {
        if (!this.isDestroyed()) {
            score++;
        }
        document.getElementById('scoreNum').innerHTML = score;
    }

    isShootMe() {
        let bool = blasterOpt.left > this.shipPositions.left - blasterOpt.width/2 &&
        blasterOpt.right < this.shipPositions.right + blasterOpt.width/2 &&
        blasterOpt.top > this.shipPositions.top - blasterOpt.height/2 &&
        blasterOpt.bottom < this.shipPositions.bottom + blasterOpt.height/2;
        return bool
    }

        //Повернуть картинку
        rotateTo(x, y) {
            let degrees;
    
            if (x == 0 && y < 0) {
                degrees = '0';
            }
    
            if (x > 0 && y < 0) {
                degrees = '45';
            }
    
            if (x > 0 && y == 0) {
                degrees = '90';
            }
    
            if (x > 0 && y > 0) {
                degrees = '135';
            }
    
            if (x == 0 && y > 0) {
                degrees = '180';
            }
    
            if (x < 0 && y > 0) {
                degrees = '225';
            }
    
            if (x < 0 && y == 0) {
                degrees = '270';
            }
    
            if (x < 0 && y < 0) {
                degrees = '315';
            }
            return degrees
        }
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GameRun() {
    millenniumFalcon.flying();
}

function gameOver() {
    clearInterval(interval);
    ship.remove();
    restartGame();
}

function restartGame() {
    document.getElementById("life").remove();
    document.getElementById('score').remove();
    let div = document.createElement('div');
    div.innerHTML = 'RESTART GAME'
    div.id = 'restart';
    div.style.cursor = 'pointer';
    document.getElementById('interface').appendChild(div);
    document.getElementById('restart').addEventListener('click', restart);
}

function restart() {
    location.reload();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mouseMove(event) {
    blasterOpt = blaster.getBoundingClientRect();
    document.getElementById('space').style.cursor = 'none';
    mousePositionX = event.offsetX;
    mousePositionY = event.offsetY;
    lastBlasterPositionX = mousePositionX+space.startX-blasterOpt.width/2;
    lastBlasterPositionY = mousePositionY+space.startY-blasterOpt.height/2;
    blaster.style.left = `${lastBlasterPositionX}px`;
    blaster.style.top = `${lastBlasterPositionY}px`;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function spaceSize() {
    let space = document.getElementById('space');
    let height = space.getBoundingClientRect().height;
    let width = space.getBoundingClientRect().width;
    let startLeft = space.getBoundingClientRect().left;
    let startY = space.getBoundingClientRect().top;
    return {height: height,
            width: width,
            startX: startLeft,
            startY: startY};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function keyboardControl(event) {

    switch (event.key) {
        case 'w':
        case 'ц':
            toUP();
            break;
        case 'a':
        case 'ф':
            toLEFT();
            break;
        case 'd':
        case 'в':
            toRIGHT();
            break;
        case 's':
        case 'ы':
            toDOWN();
            break;
        case ' ':
            toHIT();
            break;
        default:
            break;
    }
}

function toUP() {
    blasterOpt = blaster.getBoundingClientRect();
    if (lastBlasterPositionY - STEP  > space.startY) {
        lastBlasterPositionY -= STEP;
        blaster.style.top = `${lastBlasterPositionY}px`;
    }
}

function toLEFT() {
    blasterOpt = blaster.getBoundingClientRect();
    if (lastBlasterPositionX - STEP > space.startX) {
        lastBlasterPositionX -= STEP;
        blaster.style.left = `${lastBlasterPositionX}px`;
    }
}

function toRIGHT() {
    blasterOpt = blaster.getBoundingClientRect();
    if (lastBlasterPositionX + STEP < space.startX+space.width-blasterOpt.width) {
        lastBlasterPositionX += STEP;
        blaster.style.left = `${lastBlasterPositionX}px`;
    }
}

function toDOWN() {
    blasterOpt = blaster.getBoundingClientRect();
    if (lastBlasterPositionY + STEP < space.startY+space.height-blasterOpt.height) {
        lastBlasterPositionY += STEP;
        blaster.style.top = `${lastBlasterPositionY}px`;
    }
}

function toHIT() {
    millenniumFalcon.hit();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventsListeners() {
    ship = document.getElementById('spaceship');
    let shipIMG = document.getElementById('spaceshipIMG')
    blaster = document.getElementById('blaster');
    blasterOpt = blaster.getBoundingClientRect();
    space = spaceSize();
    millenniumFalcon = new Ship(3, ship, shipIMG)
    millenniumFalcon.startPositionOfShip();
    millenniumFalcon.startLife();
    document.addEventListener('keydown', keyboardControl);
    document.getElementById('space').addEventListener("mousemove", mouseMove);
    document.getElementById('space').addEventListener('click', millenniumFalcon.hit.bind(millenniumFalcon));
    interval = setInterval(GameRun, GAME_INTERVAL);
}

document.addEventListener('DOMContentLoaded', eventsListeners);
