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
//               j            ,,,     .,,   E#t           ,;.     ,,,      .,,   ,           :             //
//                                           L:                                                             //
//                                                                                                          //
//                                                                                                          //
//                                        Developed by Potapchuk D.A.                                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
const STEP = 5;
const STEP_AIM = 8;
const START = {LEFT_CORNER: 0, CENTER: 1};
const START_POSITION = 1;

let rabbitOpt;
let aimOpt;
let rabbit;
let aim;

let mousePositionX=0;
let mousePositionY=0;
let lastAimPositionX = 0;
// let this.lifeOfRabbit = 3;
let lastAimPositionY = 0;
let shot = 0;
let run;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЭКЗЕМПЛЯР ПЕРСОНАЖА И ЕГО ФУНКЦИИ(ВОЗМОЖНОСТИ) 
//МОЖНО ЗАПИСАТЬ ДАННЫЕ ФУНКЦИИ ОТДЕЛЬНО


//enum


class Rabbit {

    constructor(life) {
        this.lifeOfRabbit = life;
    }
    
    startRabbitPos(startPos) {
        if (startPos == START.CENTER) {
            this.lastRabbitPositionX = fieldSize()[1]/2-rabbit.getBoundingClientRect().width/2;
            this.lastRabbitPositionY = fieldSize()[0]/2-rabbit.getBoundingClientRect().height/2;
        } else if (startPos == START.LEFT_CORNER) {
            this.lastRabbitPositionX = 0;
            this.lastRabbitPositionY = 0;
        }
    
        rabbit.style.left = `${this.lastRabbitPositionX}px`;
        rabbit.style.top = `${this.lastRabbitPositionY}px`;
    }

    //ЕГО МОЖНО ПОДСТРЕЛИТЬ
    hit() {
        shots();
        if (isReadyToHit()) {
            switch (--this.lifeOfRabbit) {
                case 2:
                    document.getElementById('heart3').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
                    break;
                case 1:
                    document.getElementById('heart2').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
                    break;
                case 0:
                    document.getElementById('heart3').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
                    break;
                default:
                    break;
            }
        }
    }

    //ОН УМЕЕТ БЕГАТЬ
    run() {

        //Новые пути
        let newPathX = getRandomInt();
        let newPathY = getRandomInt();
        //Следующая позиция
        // let time = 0;

        for (let time = 0; time < 500; time+=50) {

            //Передвижение
            setTimeout(() => {
                let newRabbitPositionX = this.lastRabbitPositionX + newPathX;
                let newRabbitPositionY = this.lastRabbitPositionY + newPathY;
  
                while (newRabbitPositionX < 0 || newRabbitPositionX > fieldSize()[1] - rabbit.getBoundingClientRect().width) {
                    newPathX = getRandomInt();
                    newRabbitPositionX = this.lastRabbitPositionX + newPathX;
                }
                
                while (newRabbitPositionY < 0 || newRabbitPositionY > fieldSize()[0] - rabbit.getBoundingClientRect().height) {
                    newPathY = getRandomInt();
                    newRabbitPositionY = this.lastRabbitPositionY + newPathY;
                }

                rabbit.style.left = `${newRabbitPositionX}px`;
                rabbit.style.top = `${newRabbitPositionY}px`;

                this.lastRabbitPositionX = newRabbitPositionX;
                this.lastRabbitPositionY = newRabbitPositionY;

                rabbitOpt = rabbit.getBoundingClientRect();
            }, time);
        }      
    }

    //ОН УМЕЕТ УМИРАТЬ
    isDead() {
        if (this.lifeOfRabbit <= 0) {
            return true;
        } 
    }
}


//СОЗДАЮ ЭКЗМЕПЛЯР ПЕРСОНАЖА
let bugsBunny = new Rabbit(3);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GAME

function GameStart() {
    if (bugsBunny.isDead()) {
        GameStop();
        return;
    }
    bugsBunny.run();
}

function GameStop() {
    clearInterval(run);
    document.getElementById('field').removeEventListener("click", shots);
    document.getElementById('rabbitIMG').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/ghost.gif`;
    document.getElementById('life').innerHTML = 'GAME OVER!';
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//НОВЫЙ ПУТЬ

function getRandomInt() {
    let nextPos = [-STEP, 0, STEP];
    return nextPos[Math.floor(Math.random() * 3)];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГОТОВНОСТЬ К УДАРУ

function isReadyToHit() {
    return aimOpt.left > rabbitOpt.left - aimOpt.width/2 &&
        aimOpt.right < rabbitOpt.right + aimOpt.width/2 &&
        aimOpt.top > rabbitOpt.top - aimOpt.height/2 &&
        aimOpt.bottom < rabbitOpt.bottom + aimOpt.height/2;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//УПРАВЛЕНИЕ КЛАВИАТУРОЙ

function keyboardClick(event) {

    switch (event.keyCode) {
        case 87:
            aimUP();
            break;
        case 65:
            aimLEFT();
            break;
        case 68:
            aimRIGHT();
            break;
        case 83:
            aimDOWN();
            break;
        case 32:
            aimHIT();
            break;
        default:
            break;
    }
}

function aimUP() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionY - STEP_AIM  > fieldSize()[3]) {
        lastAimPositionY -= STEP_AIM;
        aim.style.top = `${lastAimPositionY}px`;
    }
}

function aimLEFT() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionX - STEP_AIM > fieldSize()[2]) {
        lastAimPositionX -= STEP_AIM;
        aim.style.left = `${lastAimPositionX}px`;
    }
}

function aimRIGHT() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionX + STEP_AIM < fieldSize()[2]+fieldSize()[1]-aimOpt.width) {
        lastAimPositionX += STEP_AIM;
        aim.style.left = `${lastAimPositionX}px`;
    }
}

function aimDOWN() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionY + STEP_AIM < fieldSize()[3]+fieldSize()[0]-aimOpt.height) {
        lastAimPositionY += STEP_AIM;
        aim.style.top = `${lastAimPositionY}px`;
    }
}

function aimHIT() {
    bugsBunny.hit();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Считает количество выстрелов
function shots() {
    if (!bugsBunny.isDead()){
        shot += 1;
        document.getElementById('shotNum').innerHTML = shot;
    }
}

//Вычисление позиции курсора
//Курсор вычисляется относительно всего окна
function mousePosition(event) {
    aimOpt = aim.getBoundingClientRect();
    document.getElementById('field').style.cursor = 'none';
    mousePositionX = event.offsetX;
    mousePositionY = event.offsetY;
    lastAimPositionX = mousePositionX+fieldSize()[2]-aimOpt.width/2;
    lastAimPositionY = mousePositionY+fieldSize()[3]-aimOpt.height/2;
    aim.style.left = `${lastAimPositionX}px`;
    aim.style.top = `${lastAimPositionY}px`;
}

//Вычисление размера окна
function fieldSize() {
    let height = document.getElementById('field').getBoundingClientRect().height;
    let width = document.getElementById('field').getBoundingClientRect().width;
    let startX = document.getElementById('field').getBoundingClientRect().left;
    let startY = document.getElementById('field').getBoundingClientRect().top;
    let size = [height, width, startX, startY];
    return size;
}

//Стартовая позиция кролика (относительно окна)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventsListeners() {
    rabbit = document.getElementById('rabbit');
    aim = document.getElementById('aim');
    rabbitOpt = rabbit.getBoundingClientRect();
    aimOpt = aim.getBoundingClientRect();
    //Ставим начальную позицию кролику
    bugsBunny.startRabbitPos(START_POSITION);
    //Обработка события ОБЯЗАТЕЛЬНО ВНУТРИ ПОЛЯ, иначе будет отсчитывать от всего окна!
    //Следим за курсором
    document.getElementById('field').addEventListener("mousemove", mousePosition);
    //Следим за кликом мышки
    document.getElementById('field').addEventListener('click', bugsBunny.hit.bind(bugsBunny));
    //Следим за вводом с клавиатуры
    document.addEventListener('keydown', keyboardClick);
    run = setInterval(GameStart, 500);
}

document.addEventListener('DOMContentLoaded', eventsListeners);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

