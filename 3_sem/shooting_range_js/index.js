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
const RABBIT_LIFE = 5;


let bugsBunny;
let aimOpt;
let aim;
let fieldOpt;
let mousePositionX=0;
let mousePositionY=0;
let lastAimPositionX = 0;
let lastAimPositionY = 0;
let shot = 0;
let run;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЭКЗЕМПЛЯР ПЕРСОНАЖА И ЕГО ФУНКЦИИ(ВОЗМОЖНОСТИ) 
//МОЖНО ЗАПИСАТЬ ДАННЫЕ ФУНКЦИИ ОТДЕЛЬНО


//enum

class Rabbit {

    constructor(life, rabbit) {
        this.lifeOfRabbit = life,
        this.rabbit = rabbit,
        this.rabbitOpt = this.rabbit.getBoundingClientRect()
        this.setLife();
    }

    setLife() {
        for (let i = 0; i < this.lifeOfRabbit; i++) {
            let heart = document.createElement('img');
            heart.className = 'alive'
            heart.style.width = '5%';
            heart.src = 'photo/heart.png'
            document.getElementById(`life`).append(heart);
        }
    }

    startRabbitPos(startPos) {
        if (startPos == START.CENTER) {
            this.lastRabbitPositionX = fieldOpt.width/2-this.rabbitOpt.width/2;
            this.lastRabbitPositionY = fieldOpt.height/2-this.rabbitOpt.height/2;
        } else if (startPos == START.LEFT_CORNER) {
            this.lastRabbitPositionX = 0;
            this.lastRabbitPositionY = 0;
        }
    
        this.rabbit.style.left = `${this.lastRabbitPositionX}px`;
        this.rabbit.style.top = `${this.lastRabbitPositionY}px`;
    }

    //ЕГО МОЖНО ПОДСТРЕЛИТЬ
    hit() {
        this.shots();
        if (this.isReadyToHit()) {
            this.deleteLife();
            // switch (--this.lifeOfRabbit) {
            //     case 2:
            //         document.getElementById('heart3').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
            //         break;
            //     case 1:
            //         document.getElementById('heart2').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
            //         break;
            //     case 0:
            //         document.getElementById('heart3').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
            //         break;
            //     default:
            //         break;
            // }
        }
    }

    //ОН УМЕЕТ БЕГАТЬ
    run() {

        //Новые пути
        let newPathX = this.getRandomInt();
        let newPathY = this.getRandomInt();
        //Следующая позиция
        // let time = 0;

        for (let time = 0; time < 500; time+=50) {

            //Передвижение
            setTimeout(() => {
                let newRabbitPositionX = this.lastRabbitPositionX + newPathX;
                let newRabbitPositionY = this.lastRabbitPositionY + newPathY;
  
                while (newRabbitPositionX < 0 || newRabbitPositionX > fieldOpt.width - rabbit.getBoundingClientRect().width) {
                    newPathX = this.getRandomInt();
                    newRabbitPositionX = this.lastRabbitPositionX + newPathX;
                }
                
                while (newRabbitPositionY < 0 || newRabbitPositionY > fieldOpt.height - rabbit.getBoundingClientRect().height) {
                    newPathY = this.getRandomInt();
                    newRabbitPositionY = this.lastRabbitPositionY + newPathY;
                }

                this.rabbit.style.left = `${newRabbitPositionX}px`;
                this.rabbit.style.top = `${newRabbitPositionY}px`;

                this.lastRabbitPositionX = newRabbitPositionX;
                this.lastRabbitPositionY = newRabbitPositionY;

                this.rabbitOpt = this.rabbit.getBoundingClientRect();
            }, time);
        }      
    }

    //ОН УМЕЕТ УМИРАТЬ
    isDead() {
        if (this.lifeOfRabbit <= 0) {
            return true;
        } 
    }

    //Считает количество выстрелов
    shots() {
        if (!this.isDead()){
            shot += 1;
            document.getElementById('shotNum').innerHTML = shot;
        }
    }

    //ГОТОВНОСТЬ К УДАРУ
    isReadyToHit() {
        return aimOpt.left > this.rabbitOpt.left - aimOpt.width/2 &&
            aimOpt.right < this.rabbitOpt.right + aimOpt.width/2 &&
            aimOpt.top > this.rabbitOpt.top - aimOpt.height/2 &&
            aimOpt.bottom < this.rabbitOpt.bottom + aimOpt.height/2;
    }
    
    deleteLife() {
        if (!this.isDead()) {
            let aliveHearts = document.getElementsByClassName('alive');
            aliveHearts[--this.lifeOfRabbit].src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`
            if (this.isDead()) {
                GameStop();
            }
        } 
    }

    //НОВЫЙ ПУТЬ
    getRandomInt() {
        let nextPos = [-STEP, 0, STEP];
        return nextPos[Math.floor(Math.random() * 3)];
    }
}

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
    document.getElementById('field').removeEventListener("click", bugsBunny.shots.bind(bugsBunny));
    document.getElementById('rabbitIMG').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/ghost.gif`;
    let life = document.getElementById('life')
    life.innerHTML = 'GAME OVER!';
    life.style.justifyContent = 'center';
    getRestart();
}

function getRestart() {
    let resDiv = document.createElement('div');
    resDiv.id = 'restart';
    let resDivText = document.createElement('p');
    resDivText.innerHTML = 'Restart Game!' 
    resDivText.id = 'restartText';
    document.body.appendChild(resDiv);
    document.getElementById('restart').appendChild(resDivText);
    document.getElementById('restartText').addEventListener('click', restart);
}

function restart() {
    location.reload();
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
    if (lastAimPositionY - STEP_AIM  > fieldOpt.top) {
        lastAimPositionY -= STEP_AIM;
        aim.style.top = `${lastAimPositionY}px`;
    }
}

function aimLEFT() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionX - STEP_AIM > fieldOpt.left) {
        lastAimPositionX -= STEP_AIM;
        aim.style.left = `${lastAimPositionX}px`;
    }
}

function aimRIGHT() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionX + STEP_AIM < fieldOpt.left+fieldOpt.width-aimOpt.width) {
        lastAimPositionX += STEP_AIM;
        aim.style.left = `${lastAimPositionX}px`;
    }
}

function aimDOWN() {
    aimOpt = aim.getBoundingClientRect();
    if (lastAimPositionY + STEP_AIM < fieldOpt.top+fieldOpt.height-aimOpt.height) {
        lastAimPositionY += STEP_AIM;
        aim.style.top = `${lastAimPositionY}px`;
    }
}

function aimHIT() {
    bugsBunny.hit();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Вычисление позиции курсора
//Курсор вычисляется относительно всего окна
function mousePosition(event) {
    aimOpt = aim.getBoundingClientRect();
    document.getElementById('field').style.cursor = 'none';
    mousePositionX = event.offsetX;
    mousePositionY = event.offsetY;
    lastAimPositionX = mousePositionX+fieldOpt.left-aimOpt.width/2;
    lastAimPositionY = mousePositionY+fieldOpt.top-aimOpt.height/2;
    aim.style.left = `${lastAimPositionX}px`;
    aim.style.top = `${lastAimPositionY}px`;
}

//Вычисление размера окна
function fieldSize() {
    let field = document.getElementById('field');
    let height = field.getBoundingClientRect().height;
    let width = field.getBoundingClientRect().width;
    let startX = field.getBoundingClientRect().left;
    let startY = field.getBoundingClientRect().top;
    return {top: startY,
            left: startX,
            width: width,
            height: height};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventsListeners() {
    let rabbit = document.getElementById('rabbit');
    aim = document.getElementById('aim');
    aimOpt = aim.getBoundingClientRect();
    //Ставим начальную позицию кролику
    bugsBunny = new Rabbit(RABBIT_LIFE, rabbit);
    setTimeout(() => {
        fieldOpt = fieldSize();
        bugsBunny.startRabbitPos(START_POSITION);
    }, 100);
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

