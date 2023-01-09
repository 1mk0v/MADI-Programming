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
const BLOCK_SIZE = 100;
const STARTING_POSITION = '1 0';
const LIFES = 5;
const STEP = BLOCK_SIZE/10;
const MIN_BLOCKS_COUNT = 5;
const HERO_SIZE = BLOCK_SIZE/2;
const WALL_CLASS = 'wall';
const PATH_CLASS = 'path';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let mazeOpt;
let matrix;
let winBlock;
let run;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ПЕРСОНАЖИ

class Tractor {

    constructor(x, y) {
        this.x = x,
        this.y = y,
        this.STEP = 2
    };

    //Берет новое направление
    getNewWay() {
        let nextPos = [-this.STEP, this.STEP];
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
        this.setLifes(life),
        this.hero = hero,
        this.startPos(),
        this.meInBlock = {y:1,x:1};
    }

    startPos() {
        let starting = document.getElementById(STARTING_POSITION).getBoundingClientRect();
        this.x = starting.left
        this.y = starting.top
    }
    
    setLifes(life) {
        this.life = life;
        for (let i = 0; i < life; i++) {
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
        let heroPos = this.hero.getBoundingClientRect()
        return {
            top: heroPos.top,
            right: heroPos.right,
            bottom: heroPos.bottom,
            left: heroPos.left
        };
    }

    //Позиции блока с определенным ID
    blockOpt(y, x) {
        let block = document.getElementById(`${y} ${x}`);
        let blockPos = block.getBoundingClientRect();
        
        return {
            top: blockPos.top,
            right: blockPos.right,
            bottom: blockPos.bottom,
            left: blockPos.left,
            class: block.className
        };
    }

    //Блоки вокруг меня
    aroundMe(y,x) {

        return {
            topLeft: matrix[y-1][x-1],
            top: matrix[y-1][x],
            topRight: matrix[y-1][x-1],
            right: matrix[y][x+1],
            bottomRight: matrix[y+1][x+1],
            bottom: matrix[y+1][x],
            bottomLeft: matrix[y+1][x-1], 
            left: matrix[y][x-1]
        };
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
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).top &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).top > this.whereMe().top-STEP) {
                this.deleteLife();
                return;
            }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topLeft &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x-1).right > this.whereMe().left &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).top > this.whereMe().top-STEP) {
                this.deleteLife();
                return;
        }
        
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topRight &&
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
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).right &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).right < this.whereMe().right+STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topRight &&
            this.blockOpt(this.meInBlock.y-1, this.meInBlock.x+1).bottom > this.whereMe().top &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).right < this.whereMe().right+STEP) {
                this.deleteLife();   
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomRight &&
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
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottom &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).bottom < this.whereMe().bottom+STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomRight &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x+1).left < this.whereMe().right &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).bottom < this.whereMe().bottom+STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomLeft &&
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
        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).left &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).left > this.whereMe().left-STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).bottomLeft &&
            this.blockOpt(this.meInBlock.y+1, this.meInBlock.x-1).top < this.whereMe().bottom &&
            this.blockOpt(this.meInBlock.y, this.meInBlock.x).left > this.whereMe().left-STEP) {
                this.deleteLife();
                return;
        }

        if (this.aroundMe(this.meInBlock.y, this.meInBlock.x).topLeft &&
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

let thomas;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЛАБИРИНТ

//Вырисовывем блок в HTML
function createBlock(className,y,x) {
    let block = document.createElement('div');
    block.style.height = `${BLOCK_SIZE}px`;
    block.style.width = `${BLOCK_SIZE}px`;
    block.id = `${y} ${x}` 
    block.className = className;
    document.getElementById('maze').append(block);
}

///////////////////////////////////////////////////////
//Вычислим размеры лабиринта
function mazeSize() {
    let maze = document.getElementById('maze').getBoundingClientRect()
    let width = maze.width;
    let height = maze.height;
    let widthInBlocks = parseInt(width/BLOCK_SIZE);
    let heightInBlocks = parseInt(height/BLOCK_SIZE);
    if (widthInBlocks < MIN_BLOCKS_COUNT || heightInBlocks < MIN_BLOCKS_COUNT) {
        return alert('Sorry your display is so little(');
    }

    if (widthInBlocks%2 == 0) {
        widthInBlocks += 1;
    }
    
    if (heightInBlocks%2 == 0) {
        heightInBlocks += 1;
    }

    return [widthInBlocks, heightInBlocks];
}

///////////////////////////////////////////////////////
//Сделаем матрицу поля лабиринта
function createMatrixOfMaze() {
    let matrix = new Array(mazeOpt[1]);
    for (let y = 0; y < matrix.length; y++) {
        matrix[y] = new Array(mazeOpt[0]);
        matrix[y].fill(1);
    }

    //НАЧАЛЬНАЯ ПОЗИЦИЯ ЛАБИРИНТА
    console.log(matrix)
    matrix[1][1] = 0;
    return matrix; 
}


///////////////////////////////////////////////////////
//ГОТОВ ЛИ ЛАБИРИНТ
function isReady() {
    for (let y = 1; y < mazeOpt[1]; y+=2) {
        for (let x = 1; x < mazeOpt[0]; x+=2) {
                if (matrix[y][x]) {
                    return false
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
                document.getElementById(`${y} ${x}`).className = WALL_CLASS;
            } else {
                document.getElementById(`${y} ${x}`).className = PATH_CLASS;
            }
        }
    }
}

///////////////////////////////////////////////////////
//Нарисуем сам лабиринт
function printMaze() {
    let mazeStyle = document.getElementById('maze').style;
    mazeStyle.gridTemplateColumns = `repeat(${mazeOpt[0]},${BLOCK_SIZE}px)`;
    mazeStyle.gridTemplateRows = `repeat(${mazeOpt[1]},${BLOCK_SIZE}px)`;
    for (let i = 0; i<mazeOpt[1]; i++) {
        for (let j = 0; j<mazeOpt[0]; j++) {
            if (matrix[i][j] == 1) {
                createBlock(WALL_CLASS, i, j);
            } else {
                createBlock(PATH_CLASS, i,j);
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
    
    // run = setInterval(() => {
    //     if (!isReady()) {
    //         blueTractor.createNewWay();
    //         update();
    //         blueTractor.printMe(); 
    //     } else {
    //         clearInterval(run);
    //     }
    // },100);
} 

///////////////////////////////////////////////////////
//Выбираем блок выхода из лабиринта
function endBlock() {
    let endX = mazeOpt[0] - 1;
    let endYArr = new Array;
    for (let i = 1; i < mazeOpt[1];i+=2) {
        endYArr.push(i);
    }
    let randomEndY = endYArr[Math.floor(Math.random() * endYArr.length)];
    return {y: randomEndY, x: endX};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ИГРА

function GameStart() {
    createMAZE();
    let hero = document.getElementById('hero');
    let startBlock = document.getElementById(STARTING_POSITION);
    winBlock = endBlock();
    matrix[winBlock.y][winBlock.x] = 0;
    let lastBlock = document.getElementById(`${winBlock.y} ${winBlock.x}`);
    hero.style.left = `${startBlock.getBoundingClientRect().left}px`;
    hero.style.top = `${startBlock.getBoundingClientRect().top}px`;
    startBlock.style.background = 'green';
    lastBlock.style.background = 'red';
    thomas = new MazeRunner(LIFES, hero);
}

function GameOver(bool) {
    document.removeEventListener('keydown', keyboardClick);
    document.getElementById('maze').remove();
    document.getElementById('life').remove();
    document.getElementsByTagName('body')[0].style.cursor = 'default';
    thomas = null;
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

    switch (event.key) {
        case 'w':
        case 'ц':
            thomas.goUp();
            break;
        case 'a':
        case 'ф':
            thomas.goLeft();
            break;
        case 'd':
        case 'в':
            thomas.goRight();
            break;
        case 's':
        case 'ы':
            thomas.goBottom();
            break;
        default:
            break;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ОБРАБОТЧИКИ СОБЫТИЙ

function readyToStart() {
    let heroStyle = document.getElementById('hero').style;
    mazeOpt = mazeSize();
    matrix = createMatrixOfMaze();
    document.addEventListener('keydown', keyboardClick);
    heroStyle.width = `${HERO_SIZE}px`;
    heroStyle.height = `${HERO_SIZE}px`;
    GameStart();
}

document.addEventListener('DOMContentLoaded', readyToStart);