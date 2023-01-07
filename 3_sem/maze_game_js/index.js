//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
//                                                                                                          //
//                                           ED.                                                            //
//                                           E#Wi                                          .  :             //
//                                           E###G.        t                              ;W  Ef            //
//                ..       :             ..  E#fD#W;       Ej                 ..         f#E  E#t           //
//               ,W,     .Et            ;W,  E#t t##L      E#,               ;W,       .E#f   E#t           //
//              t##,    ,W#t           j##,  E#t  .E#K,    E#t              j##,      iWW;    E#t           //
//             L###,   j###t          G###,  E#t    j##f   E#t             G###,     L##Lffi  E#t fi        //
//           .E#j##,  G#fE#t        :E####,  E#t    :E#K:  E#t           :E####,    tLLG##L   E#t L#j       //
//          ;WW; ##,:K#i E#t       ;W#DG##,  E#t   t##L    E#t          ;W#DG##,      ,W#i    E#t L#L       //
//         j#E.  ##f#W,  E#t      j###DW##,  E#t .D#W;     E#t         j###DW##,     j#E.     E#tf#E:       //
//       .D#L    ###K:   E#t     G##i,,G##,  E#tiW#G.      E#t        G##i,,G##,   .D#j       E###f         //
//      :K#t     ##D.    E#t   :K#K:   L##,  E#K##i        E#t      :K#K:   L##,  ,WK,        E#K,          //
//      ...      #G      ..   ;##D.    L##,  E##D.         E#t     ;##D.    L##,  EG.         EL            //
//               j            ,,,      .,,   E#t           ,;.     ,,,      .,,   ,           :             //
//                                           L:                                                             //
//                                                                                                          //
//                                                                                                          //
//                                        Developed by Potapchuk D.A.                                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//КОНСТАНТЫ
const BLOCK_SIZE = 40;
const STARTING_POSITION = '1 1';
const LIFES = 3;
const STEP = BLOCK_SIZE/10;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// let endBlock;
let mazeOpt;
let matrix;
let winBlock;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ПЕРСОНАЖИ

class Tractor {

    constructor(x, y) {
        this.x = x,
        this.y = y
    };

    //Берет новое направление
    getNewWay() {
        let nextPos = [-2, 2];
        return nextPos[Math.floor(Math.random() * 2)];        
    }
    
    //Строит новый путь 
    createNewWay() {
        let newX;
        let newY;

        //Если выпадает 0, то смещение будет идти по оси Y
        if (Math.floor(Math.random() * 2) == 0) {
            newX = this.x;
            newY = this.y + this.getNewWay();

            while (!this.isInMaze(newY, newX)) {
                newY = this.y + this.getNewWay();
            }

            if (matrix[newY][newX] == 1) {
                if (this.y - newY > 0) {
                    matrix[newY+1][newX] = 0;
                    matrix[newY][newX] = 0;
                } else {
                    matrix[newY-1][newX] = 0;
                    matrix[newY][newX] = 0;
                }
                

            } else {
                this.x = newX;
                this.y = newY;
            }
            
        //Если выпадает 1, то смещение будет идти по оси X
        } else {
            newX = this.x + this.getNewWay();
            newY = this.y;
            while (!this.isInMaze(newY, newX)) {
                newX = this.x + this.getNewWay();
            }

            if (matrix[newY][newX] == 1) {
                if (this.x - newX > 0) {
                    matrix[newY][newX+1] = 0;
                    matrix[newY][newX] = 0;
                } else {
                    matrix[newY][newX-1] = 0;
                    matrix[newY][newX] = 0;
                }
                

            } else {
                this.x = newX;
                this.y = newY;
            }
        }
        
        this.x = newX;
        this.y = newY;
    }

    //Проверка находится ли трактор в лабиринте
    isInMaze(y,x) {
        if (1 <= y && y <= mazeOpt[1]-1 && 1 <= x && x <= mazeOpt[0]-1) {
            return true;
        }
    }

    //Рисует трактор
    printMe() {
        document.getElementById(`${this.y} ${this.x}`).className='tractor';
    }
}

let blueTractor = new Tractor(1,1);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class MazeRunner {

    constructor(life,hero) {
        this.life = life,
        this.hero = hero,
        this.x = this.startPos()[0],
        this.y = this.startPos()[1]
        this.meInBlock = {y:1,x:1};
    }

    startPos() {
        let starting = document.getElementById(STARTING_POSITION).getBoundingClientRect();
        let x = starting.left;
        let y = starting.top;
        return [x,y];
    }
    
    setLifes() {
        for (let i = 0; i < this.life; i++) {
            let heart = document.createElement('img');
            heart.className = 'alive'
            heart.style.width = '5%';
            heart.src = 'photo/heart.png'
            document.getElementById(`life`).append(heart);
        }
    }

    deleteLife() {
        let aliveHearts = document.getElementsByClassName('alive');
        aliveHearts[this.life-1].remove();
        this.life-=1;
        if (this.isDead()) {
            GameOver(false);
        }
    }

    isDead() {
        if (this.life <=0) {
            return true;
        }
    }

    isWin() {
        if (this.meInBlock.y == winBlock.y &&
            this.meInBlock.x == winBlock.x) {
                GameOver(true);
        }
    }

    //Мои позиции
    whereMe() {
        let myPosition = new Object();
        let top = this.hero.getBoundingClientRect().top;
        let right = this.hero.getBoundingClientRect().right;
        let bottom = this.hero.getBoundingClientRect().bottom;
        let left = this.hero.getBoundingClientRect().left;
        myPosition = {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        };
        return myPosition;
    }

    //Позиции блока с определенным ID
    blockOpt(y, x) {
        let positions = new Object;
        let block = document.getElementById(`${y} ${x}`);
        let top = block.getBoundingClientRect().top;
        let right = block.getBoundingClientRect().right;
        let bottom = block.getBoundingClientRect().bottom;
        let left = block.getBoundingClientRect().left;
        let className = block.className;
        positions = {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            class: className
        };
        return positions;
    }

    //Блоки вокруг меня
    aroundMe(y,x) {
        let bool = new Object;
        let topBlock = document.getElementById(`${y-1} ${x}`).className;
        let topRightBlock = document.getElementById(`${y-1} ${x-1}`).className;
        let rightBlock = document.getElementById(`${y} ${x+1}`).className;
        let bottomRightBlock = document.getElementById(`${y+1} ${x+1}`).className;
        let bottomBlock = document.getElementById(`${y+1} ${x}`).className;
        let bottomLeftBlock = document.getElementById(`${y+1} ${x-1}`).className;
        let leftBlock = document.getElementById(`${y} ${x-1}`).className;
        let topLeftBlock = document.getElementById(`${y-1} ${x-1}`).className;
        bool = {
            topLeft: topLeftBlock,
            top: topBlock,
            topRight: topRightBlock,
            right: rightBlock,
            bottomRight: bottomRightBlock,
            bottom: bottomBlock,
            bottomLeft: bottomLeftBlock, 
            left: leftBlock
        };
        return bool;
    }

    //Переход в другой блок
    isMeInNewBlock(y, x) {
        if (this.blockOpt(y,x).top <= this.whereMe().top &&
            this.blockOpt(y,x).right >= this.whereMe().right &&
            this.blockOpt(y,x).bottom >= this.whereMe().bottom &&
            this.blockOpt(y,x).left <= this.whereMe().left) {
                return true;
            }
    }

    //Управление клавиатурой
    goUp() {
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).top == 'false' &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).top > this.whereMe().top-STEP) {
                this.deleteLife();
                return;
            }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topLeft == 'false' &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x-1).right > this.whereMe().left &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).top > this.whereMe().top-STEP) {
                this.deleteLife();
                return;
        }
        
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topRight == 'false' &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x+1).left < this.whereMe().right &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).top > this.whereMe().top-STEP) {
                this.deleteLife();
                return;
        }

        if (this.isMeInNewBlock(this.meInBlock.y - 1, this.meInBlock.x)) {
            this.meInBlock.y -= 1;
        }

        this.y -= STEP;
        this.hero.style.top = `${this.y}px`;

        this.isWin();


    }

    goRight() {
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).right == 'false' &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).right < this.whereMe().right+STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topRight == 'false' &&
            this.blockOpt(this.meInBlock.y-1, this.meInBlock.x+1).bottom > this.whereMe().top &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).right < this.whereMe().right+STEP) {
                this.deleteLife();   
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomRight == 'false' &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x+1).top < this.whereMe().bottom &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).right < this.whereMe().right+STEP) {
                this.deleteLife();
                return;
        }

        if (this.isMeInNewBlock(this.meInBlock.y, this.meInBlock.x+1)) {
            this.meInBlock.x += 1;
        }

        this.x += STEP;
        this.hero.style.left = `${this.x}px`;

        this.isWin();
    }

    goBottom() {
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottom == 'false' &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).bottom < this.whereMe().bottom+STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomRight == 'false' &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x+1).left < this.whereMe().right &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).bottom < this.whereMe().bottom+STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomLeft == 'false' &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x-1).right > this.whereMe().left &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).bottom < this.whereMe().bottom+STEP) {
                this.deleteLife();
                return;
        }

        if (this.isMeInNewBlock(this.meInBlock.y + 1, this.meInBlock.x)) {
            this.meInBlock.y += 1;
        }
        
        this.y += STEP;
        this.hero.style.top = `${this.y}px`;
    
        this.isWin();
    }

    goLeft() {
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).left == 'false' &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).left > this.whereMe().left-STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomLeft == 'false' &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x-1).top < this.whereMe().bottom &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).left > this.whereMe().left-STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topLeft == 'false' &&
            this.blockOpt(this.meInBlock.y-1, this.meInBlock.x-1).bottom > this.whereMe().top &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).left > this.whereMe().left-STEP) {
                this.deleteLife();  
                return;
        }

        if (this.isMeInNewBlock(this.meInBlock.y, this.meInBlock.x-1)) {
            this.meInBlock.x -= 1;
        }

        this.x -= STEP;
        this.hero.style.left = `${this.x}px`;

        this.isWin();
    }
}

let Thomas;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЛАБИРИНТ

//Вырисовывем блок в HTML
function createBlock(bool,y,x) {
    let block = document.createElement('div');
    block.style.height = `${BLOCK_SIZE}px`;
    block.style.width = `${BLOCK_SIZE}px`;
    block.id = `${y} ${x}` 
    block.className = bool;
    document.getElementById('maze').append(block);
}

///////////////////////////////////////////////////////
//Вычислим размеры лабиринта
function mazeSize() {
    let width = document.getElementById('maze').getBoundingClientRect().width;
    let height = document.getElementById('maze').getBoundingClientRect().height;
    let widthInBlocks = parseInt(width/BLOCK_SIZE);
    let heightInBlocks = parseInt(height/BLOCK_SIZE);
    if (widthInBlocks < 5 || heightInBlocks < 5) {
        return alert('Sorry your display is so little(');
    }

    if (widthInBlocks%2 == 0) {
        widthInBlocks += 1;
    }
    
    if (heightInBlocks%2 == 0) {
        heightInBlocks += 1;
    }
    console.log([widthInBlocks, heightInBlocks])
    return [widthInBlocks, heightInBlocks];
}

///////////////////////////////////////////////////////
//Сделаем матрицу поля лабиринта
function createMatrixOfMaze() {
    let matrix = new Array();
    for (let y = 0; y<=mazeOpt[1]; y++) {
        matrix[y] = new Array();
        for (let x = 0; x<=mazeOpt[0]; x++) {
            matrix[y][x] = 1;
        }
    }

    //НАЧАЛЬНАЯ ПОЗИЦИЯ ЛАБИРИНТА
    matrix[1][1] = 0;
    return matrix;
}

///////////////////////////////////////////////////////
//ГОТОВ ЛИ ЛАБИРИНТ
function isReady() {
    for (let y = 1; y < mazeOpt[1]; y+=2) {
        for (let x = 1; x < mazeOpt[0]; x+=2) {
                if (matrix[y][x]) {
                    return false;
                }
            }
        }
    return true;
}
    
///////////////////////////////////////////////////////
//Обновление лабиринта
function update() {
    for (let y=0; y<mazeOpt[1];y++) {
        for (let x=0; x<mazeOpt[0];x++) {
            if (matrix[y][x] == 1) {
                document.getElementById(`${y} ${x}`).className = 'false';
            } else {
                document.getElementById(`${y} ${x}`).className = 'true';
            }
        }
    }
}

///////////////////////////////////////////////////////
//Нарисуем сам лабиринт
function printMaze() {
    document.getElementById('maze').style.gridTemplateColumns = `repeat(${mazeOpt[0]},${BLOCK_SIZE}px)`;
    document.getElementById('maze').style.gridTemplateRows = `repeat(${mazeOpt[1]},${BLOCK_SIZE}px)`;
    for (let i = 0; i<mazeOpt[1]; i++) {
        for (let j = 0; j<mazeOpt[0]; j++) {
            if (matrix[i][j] == 1) {
                createBlock('false', i, j);
            } else {
                createBlock('true', i,j);
            }
        }
    }
}

///////////////////////////////////////////////////////
//Создаем лабиринт
function createMAZE() {
    printMaze();
    while (!isReady()) {
        for (let i = 0; i < 1000; i++){
            blueTractor.createNewWay();
        }
        update();
    }
}

///////////////////////////////////////////////////////
//Выбираем блок выхода из лабиринта
function endBlock() {
    let winPos = new Object;
    let endX = mazeOpt[0] - 2;
    let endYArr = new Array;
    for (let i = 1; i < mazeOpt[1];i+=2) {
        endYArr.push(i);
    }
    let randomEndY = endYArr[Math.floor(Math.random() * endYArr.length)];
    winPos = {y: randomEndY, x: endX}
    return winPos;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ИГРА

function GameStart() {
    createMAZE();
    let startBlock = document.getElementById(STARTING_POSITION);
    winBlock = endBlock();
    let lastBlock = document.getElementById(`${winBlock.y} ${winBlock.x}`);
    document.getElementById('hero').style.left = `${startBlock.getBoundingClientRect().left}px`;
    document.getElementById('hero').style.top = `${startBlock.getBoundingClientRect().top}px`;
    startBlock.style.background = 'green';
    lastBlock.style.background = 'red';
    Thomas = new MazeRunner(LIFES, document.getElementById('hero'));
    Thomas.setLifes();
}

function GameOver(bool) {
    document.removeEventListener('keydown', keyboardClick);
    document.getElementById('maze').remove();
    document.getElementById('life').remove();
    document.getElementsByTagName('body')[0].style.cursor = 'default';
    Thomas = null;
    let img = document.createElement('img');
    img.style.display = 'block';
    img.style.width = '50vw';
    img.style.margin = '0 auto';
    if (bool) {
        img.src = 'photo/win.webp';
        document.getElementsByTagName('body')[0].append(img);
    } else { 
        img.src = 'photo/gameover.gif';
        document.getElementsByTagName('body')[0].append(img);
    }
    getRestart();
}

function getRestart() {
    let resDiv = document.createElement('div');
    resDiv.id = 'restart';
    resDiv.style.width = '300px'
    resDiv.style.margin = '5vh auto';
    resDiv.style.textAlign = 'center';
    resDiv.style.fontSize = '20px';
    resDiv.style.color = 'red';
    let resDivText = document.createElement('p');
    resDivText.innerHTML = 'Restart Game!' 
    resDivText.style.cursor = 'pointer';
    resDivText.id = 'restartText';

    document.body.appendChild(resDiv);
    document.getElementById('restart').appendChild(resDivText);
    document.getElementById('restartText').addEventListener('click', restart);
}

function restart() {
    location.reload();
}
///////////////////////////////////////////////////////
//УПРАВЛЕНИЕ КЛАВИАТУРОЙ

function keyboardClick(event) {

    switch (event.keyCode) {
        case 87:
            Thomas.goUp();
            break;
        case 65:
            Thomas.goLeft();
            break;
        case 68:
            Thomas.goRight();
            break;
        case 83:
            Thomas.goBottom();
            break;
        default:
            break;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ОБРАБОТЧИКИ СОБЫТИЙ

function readyToStart() {
    mazeOpt = mazeSize();
    matrix = createMatrixOfMaze();
    document.addEventListener('keydown', keyboardClick);
    document.getElementById('hero').style.width = `${BLOCK_SIZE/2}px`;
    document.getElementById('hero').style.height = `${BLOCK_SIZE/2}px`;
    GameStart();
}

document.addEventListener('DOMContentLoaded', readyToStart);