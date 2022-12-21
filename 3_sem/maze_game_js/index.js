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

//За основу взят метод рекурсивного деления

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

var mazeOpt;
var matrix;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЛАБИРИНТ

class Block {
    //Вырисовывем блок в HTML
    createBlock(bool) {
        let block = document.createElement('div');
        block.style.height = '20px';
        block.style.width = '20px';
        block.className = bool;
        // block.classList.add = i;
        // block.classList.add = j;
        document.getElementById('maze').append(block);
    }
}

let brick = new Block();


//Возмем рандомную точку для в области
function getRandomInt() {
    let width = document.getElementById('maze').getBoundingClientRect().width;
    let height = document.getElementById('maze').getBoundingClientRect().height;
    let positionX = Math.floor(Math.random() * parseInt(width/20));
    let positionY = Math.floor(Math.random() * parseInt(height/20));
    return [positionX, positionY];
}


//Вычислим размеры лабиринта
function mazeSize() {
    let width = document.getElementById('maze').getBoundingClientRect().width;
    let height = document.getElementById('maze').getBoundingClientRect().height;
    return [width, height]
}


//Сделаем матрицу лабиринта
function createMatrixOfMaze() {
    let matrix = new Array();
    for (let i =0; i<parseInt(mazeOpt[1]/20); i++) {
        matrix[i] = new Array();
        for (let j=0; j<parseInt(mazeOpt[0]/20); j++) {
            if ((i == 0 || i == parseInt(mazeOpt[1]/20)-1) && (j >= 0 || j <= parseInt(mazeOpt[0]/20)-1)) {
                matrix[i][j] = 1;
            } else if (((i > 0 && i < parseInt(mazeOpt[1]/20-1)) && (j == 0 || j == parseInt(mazeOpt[0]/20)-1))) {
                matrix[i][j] = 1;
            }
        }
    }
    return matrix;
}

//Нарисуем стены в матрицу
function createNewWallInMatrix() {
    let positionOfWalls = getRandomInt();
    while (positionOfWalls[0] <= 4 || positionOfWalls[0] >= parseInt(mazeOpt[0]/20)-4 || positionOfWalls[1] <= 4 || positionOfWalls[1] >= parseInt(mazeOpt[1]/20) - 4) {
        positionOfWalls = getRandomInt();
    }

    for (let i = 0; i < parseInt(mazeOpt[1]/20); i++) {
        matrix[i][positionOfWalls[0]] = 1;
    }

    for (let i = 0; i < parseInt(mazeOpt[0]/20); i++) {
        matrix[positionOfWalls[1]][i] = 1;
    }

}

//Нарисуем сам лабиринт
function printMaze() {
    
    document.getElementById('maze').style.gridTemplateColumns = `repeat(${parseInt(mazeOpt[0]/20)},20px)`;
    document.getElementById('maze').style.gridTemplateRows = `repeat(${parseInt(mazeOpt[1]/20)},20px)`;

    for (let i =0; i<parseInt(mazeOpt[1]/20); i++) {
        for (let j=0; j<parseInt(mazeOpt[0]/20); j++) {
            if (matrix[i][j] == 1) {
                brick.createBlock('false');
            } else {
                brick.createBlock('true');
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ИГРА
function startGame() {
    printMaze();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ПЕРСОНАЖ

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ПРАВИЛА ИГРЫ


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ОБРАБОТЧИКИ СОБЫТИЙ

function readyToStart() {
    mazeOpt = mazeSize();
    matrix = createMatrixOfMaze();
    createNewWallInMatrix();
    startGame();
}

document.addEventListener('DOMContentLoaded', readyToStart);
