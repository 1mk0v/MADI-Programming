//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//КОНСТАНТЫ
const BLOCK_SIZE = 50;
const MIN_BLOCKS_COUNT = 5;
const HERO_SIZE = BLOCK_SIZE/2;
const WALL_CLASS = 'wall';
const PATH_CLASS = 'path';
const HOUSE_NUM = 4
let INTERVAL_TIME = 100
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let mazeOpt;
let matrix;
let winBlock;
let run;
let babyAnt
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
            } else if (matrix[y][x] == 0){
                document.getElementById(`${y} ${x}`).className = PATH_CLASS;
            } else {
                // document.getElementById(`${y} ${x}`).className = 'food';
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

    removeFirst() {
        let first = this.array[0]
        this.array.splice(0,1)
        return first
    }

    getLast() {
        return this.array[this.array.length-1]
    }
    
    pop() {
        return this.array.pop()
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
//Муравейчик)

class Ant {

    constructor(hero, x, y) {
        this.hero = hero
        this.bag = Array()
        this.meInBlock = {
            x: x,
            y: y
        },
        this.myMap = copyMatrix()
        this.storage = new Stack(this.meInBlock)
        this.wayToHome = new Stack(null)
        this.homeStore = new Stack()
        this.interval = null
    }

    throwingFood() {
        let pos = endBlock()
        this.myMap[pos.y][pos.x] = 3
        document.getElementById(`${pos.y} ${pos.x}`).className = 'food';
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

    getBlockMeIn(pos) {
        return document.getElementById(`${pos.y} ${pos.x}`)
    }

    aroundMe(pos) {
        return {
            top: matrix[pos.y-1][pos.x],
            right: matrix[pos.y][pos.x+1],
            bottom: matrix[pos.y+1][pos.x],
            left: matrix[pos.y][pos.x-1]
        };
    }

    whatISee(position, map) {
        return {
            top: map[position.y-1][position.x],
            right: map[position.y][position.x+1],
            bottom: map[position.y+1][position.x],
            left: map[position.y][position.x-1]
        };
    }

    newPathes(pos, map) {
        let around = this.whatISee(pos, map)
        if (map[pos.y-1][pos.x] != 2) {
            map[pos.y-1][pos.x] = around.top
        }
        if (map[pos.y][pos.x+1] != 2) {
            map[pos.y][pos.x+1] = around.right
        }
        if (map[pos.y+1][pos.x] != 2) {
            map[pos.y+1][pos.x] = around.bottom
        }
        if (map[pos.y][pos.x-1] != 2) {
            map[pos.y][pos.x-1] = around.left
        }
        return around
    }

    whereToGo(position, map) {
        let around = this.newPathes(position, map)
        let pathes = Array()
        if (!around.top || around.top == 3 || around.top == HOUSE_NUM) {
            pathes.push({x:position.x, y:position.y-1})
        }
        if (!around.right || around.right == 3 || around.right == HOUSE_NUM) {
            pathes.push({x:position.x+1, y:position.y}) 
        }
        if (!around.bottom || around.bottom == 3 || around.bottom == HOUSE_NUM) {
            pathes.push({x:position.x, y:position.y+1})
        }
        if (!around.left || around.left == 3 || around.left == HOUSE_NUM) {
            pathes.push({x:position.x-1, y:position.y})
        }
        return pathes
    }

    findIndex(objects, value) {
        if (value == null) {
            return -1
        } 
        for (let index in objects) {
            if (JSON.stringify(objects[index]) == JSON.stringify(value)) {
                return index
            }
        }
        return -1
    }

    takePath(lastStep, position) {
        let pathes = this.whereToGo(position, this.myMap)
        if (pathes.length == 0) {
            alert('МУРАВЕЙ ОБОШЕЛ ВСЮ КАРТУ')

        } else if (pathes.length == 1) {
            this.myMap[position.y][position.x] = 2
        } else {
            let index = this.findIndex(pathes, lastStep)
            pathes.splice(index, 1)
        }
        let path = pathes[Math.floor(Math.random() * pathes.length)];
        return path
    }

    animate(pos) {
        let oldBlock = this.getBlockMeIn(pos)
        console.log(oldBlock.getBoundingClientRect().left - BLOCK_SIZE/5)
        this.hero.animate([
            {transform: `translate(${oldBlock.getBoundingClientRect().top -BLOCK_SIZE/5}px, ${oldBlock.getBoundingClientRect().left - BLOCK_SIZE/5}px)`},
          ], 300);
        this.waitFor(300)
    }

    async doStep() {
        let newPath = this.takePath(this.storage.getLast(), this.meInBlock)
        this.storage.push(this.meInBlock)
        this.meInBlock = newPath
        let block = this.getBlockMeIn(this.meInBlock)
        this.hero.style.left = `${block.getBoundingClientRect().left + BLOCK_SIZE/5}px`;
        this.hero.style.top = `${block.getBoundingClientRect().top + BLOCK_SIZE/5}px`;
        this.updatePathesColor()
        return this.meInBlock
    }

    findFood() {
        if (this.myMap[this.meInBlock.y][this.meInBlock.x] == 3) {
            return true
        }
        return false
    }

    takeFood() {
        this.myMap[this.meInBlock.y][this.meInBlock.x] = 0
        let food = document.getElementById(`${this.meInBlock.y} ${this.meInBlock.x}`)
        food.className = PATH_CLASS
        this.bag.push(this.meInBlock)
    }

    findHome(lastPos, position, map) {
        this.wayToHome.push(position)
        if (map[position.y][position.x] == 4) {
            return true
        }
        let pathes = this.whereToGo(position, map)
        let index = this.findIndex(pathes, lastPos)
        if (index > -1) pathes.splice(index, 1)
        for (let path of pathes) {
            if (this.findHome(position, path, map)) {
                return true
            }
            this.wayToHome.pop()
        }
        return false
    }


    waitFor(msec) {
      return new Promise(resolve => setTimeout(resolve, msec))
    }
    
    async goHome() {
        clearInterval(this.interval)
        console.log(this.wayToHome.array)
        for (let path of this.wayToHome.array) {
            if (path != null) {
                await this.waitFor(INTERVAL_TIME/2)
                let block = this.getBlockMeIn(path)
                block.className = 'pathToHome'
            }
        }
        for (let path of this.wayToHome.array) {
            if (path != null) {
                await this.waitFor(INTERVAL_TIME)
                this.meInBlock = path
                let block = this.getBlockMeIn(this.meInBlock)
                block.className = PATH_CLASS
                hero.style.left = `${block.getBoundingClientRect().left + BLOCK_SIZE/5}px`;
                hero.style.top = `${block.getBoundingClientRect().top + BLOCK_SIZE/5}px`;
            }
        }
        this.wayToHome.delete()
        this.homeStore.push(this.bag.pop())
        this.updateHomeStore()
        this.myMap = copyMatrix()
        update()
        this.AI()
    }

    updateHomeStore() {
        let homeDiv = document.getElementById("home_store")
        let p = document.createElement('p')
        p.innerText = JSON.stringify(this.homeStore.getLast())
        homeDiv.appendChild(p)
    }
    AI() {
        this.throwingFood()
        this.interval = setInterval(() => {
            if (this.findFood()) {
                this.takeFood()
                this.findHome(null, this.meInBlock, copyMatrix())
                this.goHome()
            }
            this.doStep()
        }, INTERVAL_TIME)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ИГРА
function copyMatrix() {
    let copy = Array()
    for (let i = 0; i<mazeOpt[1]; i++) {
        copy.push(Array())
        for (let j = 0; j<mazeOpt[0]; j++) {
            copy[i].push(matrix[i][j])
        }
    }
    return copy
}

function GameStart() {
    createMAZE();
    let hero = document.getElementById('hero');
    winBlock = endBlock();
    let startBlock = document.getElementById(`${winBlock.y} ${winBlock.x}`);
    startBlock.style.background = 'red';
    matrix[winBlock.y][winBlock.x] = HOUSE_NUM
    hero.style.left = `${startBlock.getBoundingClientRect().left + BLOCK_SIZE/5}px`;
    hero.style.top = `${startBlock.getBoundingClientRect().top + BLOCK_SIZE/5}px`;
    babyAnt = new Ant(hero, x = winBlock.x, y = winBlock.y);
    babyAnt.AI()
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