//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//КОНСТАНТЫ
const BLOCK_SIZE = 50;
const STARTING_POSITION = '1 1';
const LIFES = 5;
const STEP = BLOCK_SIZE/10;
const MIN_BLOCKS_COUNT = 5;
const HERO_SIZE = BLOCK_SIZE/2;
const WALL_CLASS = 'wall';
const PATH_CLASS = 'path';
const HOUSE_NUM = 4

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let mazeOpt;
let matrix;
let winBlock;
let run;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ПЕРСОНАЖИ

class Generator {

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
}

let blueTractor = new Generator(1,1);

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
//Нарисуем лабиринт
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
        for (let i = 0; i < 100; i++){
            blueTractor.createNewWay();
        }
        update();
    }
} 

///////////////////////////////////////////////////////
//Раскидываем еду по всему лабиринту
function throwingFood() {
    for (let y=0; y < matrix.length; y++) {
        for (let x=0; x < matrix[y].length;x++) {
            if (matrix[y][x] == 0 && Math.floor(Math.random() * 50) == 1) {
                matrix[y][x] = 3;
                document.getElementById(`${y} ${x}`).className = 'food';
            }
        }
    }
}


///////////////////////////////////////////////////////
//Выбираем блок выхода из лабиринта
function endBlock() {
    let endXArr = new Array;
    let endYArr = new Array;
    for (let i = 1; i < mazeOpt[1];i+=2) {
        endYArr.push(i);
    }
    for (let i = 1; i < mazeOpt[0];i+=2) {
        endXArr.push(i);
    }
    let randomEndY = endYArr[Math.floor(Math.random() * endYArr.length)];
    let randomEndX = endXArr[Math.floor(Math.random() * endXArr.length)];
    return {y: randomEndY, x: randomEndX};
}

class Stack {
    constructor(startPos) {
        this.array = Array(startPos)
    }

    getLast() {
        return this.array[this.array.length-1]
    }
    
    pop() {
        if (this.length > 0) {
            this.length--
            return this.array.pop()
        } 
    }

    push(value) {
        if (value != null) {
            this.array.push(value)
        }
    }

    delete() {
        this.array = Array()
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ПОИСК
class Bot {
    constructor(map, pos) {
        this.map = map
        this.pos = pos
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Муравейчик)

class Ant {

    constructor(hero, x, y) {
        this.hero = hero
        this.bag = Array()
        this.meInBlock = {
            x: x,
            y: y
        },
        this.myMap = createMatrixOfMaze()
        this.storage = new Stack(this.meInBlock)
    }

    updatePathesColor() {
        for (let y=0; y < this.myMap.length; y++) {
            for (let x=0; x < this.myMap[y].length;x++) {
                if (this.myMap[y][x] == 2) {
                    document.getElementById(`${y} ${x}`).className = 'donePath';
                }
            }
        }
    }

    getBlockMeIn() {
        return document.getElementById(`${this.meInBlock.y} ${this.meInBlock.x}`)
    }

    aroundMe() {
        return {
            top: matrix[this.meInBlock.y-1][this.meInBlock.x],
            right: matrix[this.meInBlock.y][this.meInBlock.x+1],
            bottom: matrix[this.meInBlock.y+1][this.meInBlock.x],
            left: matrix[this.meInBlock.y][this.meInBlock.x-1]
        };
    }

    whatISee() {
        return {
            top: this.myMap[this.meInBlock.y-1][this.meInBlock.x],
            right: this.myMap[this.meInBlock.y][this.meInBlock.x+1],
            bottom: this.myMap[this.meInBlock.y+1][this.meInBlock.x],
            left: this.myMap[this.meInBlock.y][this.meInBlock.x-1]
        };
    }

    newPathes() {
        let around = this.aroundMe()
        let top = this.myMap[this.meInBlock.y-1][this.meInBlock.x]
        if (top != 2) {
            this.myMap[this.meInBlock.y-1][this.meInBlock.x] = around.top
        }
        let right = this.myMap[this.meInBlock.y][this.meInBlock.x+1]
        if (right != 2) {
            this.myMap[this.meInBlock.y][this.meInBlock.x+1] = around.right
        }
        let bottom = this.myMap[this.meInBlock.y+1][this.meInBlock.x]
        if (bottom != 2) {
            this.myMap[this.meInBlock.y+1][this.meInBlock.x] = around.bottom
        }
        let left = this.myMap[this.meInBlock.y][this.meInBlock.x-1]
        if (left != 2) {
            this.myMap[this.meInBlock.y][this.meInBlock.x-1] = around.left
        }
        return this.whatISee()
    }

    whereToGo() {
        let around = this.newPathes()
        let pathes = Array()
        if (!around.top || around.top == 3 || around.top == HOUSE_NUM) {
            pathes.push({x:this.meInBlock.x, y:this.meInBlock.y-1})
        }
        if (!around.right || around.right == 3 || around.right == HOUSE_NUM) {
            pathes.push({x:this.meInBlock.x+1, y:this.meInBlock.y}) 
        }
        if (!around.bottom || around.bottom == 3 || around.bottom == HOUSE_NUM) {
            pathes.push({x:this.meInBlock.x, y:this.meInBlock.y+1})
        }
        if (!around.left || around.left == 3 || around.left == HOUSE_NUM) {
            pathes.push({x:this.meInBlock.x-1, y:this.meInBlock.y})
        }
        return pathes
    }

    findIndex(objects, value) {
        for (let index in objects) {
            if (JSON.stringify(objects[index]) == JSON.stringify(value)) {
                return index
            }
        }
        return -1
    }

    takePath() {
        let lastStep = this.storage.getLast()
        let pathes = this.whereToGo()
        if (pathes.length == 1) {
            this.myMap[this.meInBlock.y][this.meInBlock.x] = 2
        } else {
            let index = this.findIndex(pathes, lastStep)
            pathes.splice(index, 1)
        }
        let path = pathes[Math.floor(Math.random() * pathes.length)];
        return path
    }

    doStep() {
        let newPath = this.takePath()
        this.storage.push(this.meInBlock) 
        this.meInBlock = newPath
        let meInBlock = this.getBlockMeIn()
        hero.style.left = `${meInBlock.getBoundingClientRect().left + BLOCK_SIZE/5}px`;
        hero.style.top = `${meInBlock.getBoundingClientRect().top + BLOCK_SIZE/5}px`;
        this.updatePathesColor()
        return this.meInBlock
    }

    findFood() {
        if (matrix[this.meInBlock.y][this.meInBlock.x] == 3) {
            return true
        }
        return false
    }

    takeFood() {
        matrix[this.meInBlock.y][this.meInBlock.x] = 0
        let food = document.getElementById(`${this.meInBlock.y} ${this.meInBlock.x}`)
        food.className = PATH_CLASS
        this.bag.push(this.meInBlock)
    }

    findQween() {
        let searchBot = new Bot(matrix, this.meInBlock)
        searchBot.findHouse()
    }

    AI() {
        setInterval(() => {
            if (this.findFood()) {
                this.takeFood()
                this.findQween()
            }
            this.doStep()
        },
          50
        )
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ИГРА

function GameStart() {
    createMAZE();
    throwingFood()
    let hero = document.getElementById('hero');
    winBlock = endBlock();
    let lastBlock = document.getElementById(`${winBlock.y} ${winBlock.x}`);
    let startBlock = document.getElementById(`${winBlock.y} ${winBlock.x}`);
    lastBlock.style.background = 'red';
    matrix[winBlock.y][winBlock.x] = HOUSE_NUM
    hero.style.left = `${startBlock.getBoundingClientRect().left + BLOCK_SIZE/5}px`;
    hero.style.top = `${startBlock.getBoundingClientRect().top + BLOCK_SIZE/5}px`;
    babyAnt = new Ant(hero, x = winBlock.x, y = winBlock.y);
    // babyAnt.AI()
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ОБРАБОТЧИКИ СОБЫТИЙ

function readyToStart() {
    let heroStyle = document.getElementById('hero').style;
    mazeOpt = mazeSize();
    matrix = createMatrixOfMaze();
    heroStyle.width = `${HERO_SIZE}px`;
    heroStyle.height = `${HERO_SIZE}px`;
    GameStart();
}

document.addEventListener('DOMContentLoaded', readyToStart);