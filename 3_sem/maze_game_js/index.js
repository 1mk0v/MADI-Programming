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
const QUANTITY_OF_TRACTORS = 1;
const TRACTORS = [];
const STARTING_POSITION = '1 1';
const LIFES = 3;
const STEP = 5;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let starting;
let mazeOpt;
let matrix;

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

    return [widthInBlocks, heightInBlocks];
}

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ИГРА

function createMAZE() {
    printMaze();
    while (!isReady()) {
        for (let i = 0; i < 1000; i++){
            blueTractor.createNewWay();
        }
        update();
    }
}

function GameStart() {
    createMAZE();
    Thomas = new MazeRunner(LIFES, document.getElementById('hero'));
}

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
//ПЕРСОНАЖ

class MazeRunner {

    constructor(life,hero) {
        this.life = life,
        this.hero = hero,
        this.x = this.startPos()[0],
        this.y = this.startPos()[1]
    }

    startPos() {
        let starting = document.getElementById(STARTING_POSITION).getBoundingClientRect();
        let x = starting.left;
        let y = starting.top;
        return [x,y];
    }
    
    //Не работает
    setLifes() {
        for (let heart = 0; heart < this.life; heart++) {
            heart = document.createElement('img');
            heart.width = '15px';
            heart.src = 'photo/heart.png'
            document.getElementById('life').append(heart);
        }
    }

    goUp() {
        this.y -= STEP;
        this.hero.style.top = `${this.y}px`

    }

    goRight() {
        this.x += STEP;
        this.hero.style.left = `${this.x}px`
    }

    goBottom() {
        this.y += STEP;
        this.hero.style.top = `${this.y}px`
    }

    goLeft() {
        this.x -= STEP;
        this.hero.style.left = `${this.x}px`
    }

    conflict() {
        let blocksOfWall = document.getElementsByClassName('false');
        // for (let i = 0; i < blocksOfWall.length; i++) {
        //     if (blocksOfWall[i].getBoundingClientRect().)
        // }
    }
}

let Thomas;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
