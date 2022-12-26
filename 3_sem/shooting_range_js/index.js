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
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let mousePositionX=0;
let mousePositionY=0;
let lastAimPositionX = 0;
let lastAimPositionY = 0;
let lastRabbitPositionX = 0;
let lastRabbitPositionY = 0;
let lifeOfRabbit = 3;
let shot = 0;

let run;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЭКЗЕМПЛЯР ПЕРСОНАЖА И ЕГО ФУНКЦИИ(ВОЗМОЖНОСТИ) 
//МОЖНО ЗАПИСАТЬ ДАННЫЕ ФУНКЦИИ ОТДЕЛЬНО

class Rabbit {

    //ЕГО МОЖНО ПОДСТРЕЛИТЬ
    hit() {
        if (isReadyToHit()){
            lifeOfRabbit = lifeOfRabbit -1;
            switch (parseInt(lifeOfRabbit)) {
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
            return lifeOfRabbit;
        }
    }

    //ОН УМЕЕТ БЕГАТЬ
    run() {

        let rabbit = document.getElementById('rabbit');
        //Новые пути
        let newPathX = getRandomInt();
        let newPathY = getRandomInt();
        //Следующая позиция
        let newRabbitPositionX = lastRabbitPositionX + newPathX;
        let newRabbitPositionY = lastRabbitPositionY + newPathY;
        let time = 0;

        for (let i = 0; i<10; i++) {

            //Передвижение
            setTimeout(() => {

                newRabbitPositionX = lastRabbitPositionX + newPathX;
                newRabbitPositionY = lastRabbitPositionY + newPathY;

                if (newRabbitPositionX <= 0 || newRabbitPositionX >= fieldSize()[1] - 80) {
                    while (newRabbitPositionX < 0 || newRabbitPositionX > fieldSize()[1] - 80) {
                        newPathX = getRandomInt();
                        newRabbitPositionX = lastRabbitPositionX + newPathX;
                    }
                }
        
                if (newRabbitPositionY < 0 || newRabbitPositionY > fieldSize()[2] - 80) {
                    while (newRabbitPositionY < 0 || newRabbitPositionY > fieldSize()[2] - 80) {
                        newPathY = getRandomInt();
                        newRabbitPositionY = lastRabbitPositionY + newPathY;
                    }
                }

                rabbit.style.left = `${newRabbitPositionX}px`;
                rabbit.style.top = `${newRabbitPositionY}px`;

                lastRabbitPositionX = newRabbitPositionX;
                lastRabbitPositionY = newRabbitPositionY;

            }, time);
            time += 50;
        }        
    }

    //ОН УМЕЕТ УМИРАТЬ
    isDead() {
        if (lifeOfRabbit <= 0) {
            return true;
        } 
    }
}


//СОЗДАЮ ЭКЗМЕПЛЯР ПЕРСОНАЖА

let bugsBunny = new Rabbit();

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
    resDiv.style.marginTop = '5vh';
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
    let nextPos = [-5, 0, 5];
    return nextPos[Math.floor(Math.random() * 3)];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГОТОВНОСТЬ К УДАРУ

function isReadyToHit() {
    let rabbitOpt = document.getElementById('rabbit').getBoundingClientRect();
    let aimOpt = document.getElementById('aim').getBoundingClientRect();
    
    if (aimOpt.left > rabbitOpt.left - aimOpt.width/2 &&
        aimOpt.right < rabbitOpt.right + aimOpt.width/2&&
        aimOpt.top > rabbitOpt.top - aimOpt.height/2&&
        aimOpt.bottom < rabbitOpt.bottom + aimOpt.height/2) {
            return true;
        }
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
    if (lastAimPositionY - 8 > fieldSize()[3]) {
        lastAimPositionY = lastAimPositionY - 8;
        document.getElementById('aim').style.top = `${lastAimPositionY}px`;
    }
}

function aimLEFT() {
    if (lastAimPositionX - 8 > fieldSize()[2]) {
        lastAimPositionX = lastAimPositionX - 8;
        document.getElementById('aim').style.left = `${lastAimPositionX}px`;
    }
}

function aimRIGHT() {
    if (lastAimPositionX + 8 < fieldSize()[2]+fieldSize()[1]-80) {
        lastAimPositionX = lastAimPositionX + 8;
        document.getElementById('aim').style.left = `${lastAimPositionX}px`;
    }
}

function aimDOWN() {
    if (lastAimPositionY + 8 < fieldSize()[3]+fieldSize()[0]-80) {
        lastAimPositionY = lastAimPositionY + 8;
        document.getElementById('aim').style.top = `${lastAimPositionY}px`;
    }
}

function aimHIT() {
    shots();
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
    let aimOpt = document.getElementById('aim').getBoundingClientRect()
    let aim = document.getElementById('aim');
    //Поле срабатывания прицела
    let activeAim = 0 <= event.offsetX && event.offsetX <= fieldSize()[1] && 0 <= event.offsetY && event.offsetY <= fieldSize()[0];
    if (activeAim) {
        document.getElementById('field').style.cursor = 'none';
        mousePositionX = event.offsetX;
        mousePositionY = event.offsetY;
        lastAimPositionX = mousePositionX+fieldSize()[2]-aimOpt.width/2;
        lastAimPositionY = mousePositionY+fieldSize()[3]-aimOpt.height/2;
        aim.style.left = `${lastAimPositionX}px`;
        aim.style.top = `${lastAimPositionY}px`;
    }
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
function startRabbitPos() {
    let startX = 0;
    let startY = 0;
    lastRabbitPositionX = startX;
    lastRabbitPositionY = startY;
    let rabbit = document.getElementById('rabbit');
    rabbit.style.left = `${lastRabbitPositionX}px`;
    rabbit.style.top = `${lastRabbitPositionY}px`;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventsListeners() {
    //Ставим начальную позицию кролику
    startRabbitPos();
    //Обработка события ОБЯЗАТЕЛЬНО ВНУТРИ ПОЛЯ, иначе будет отсчитывать от всего окна!
    //Следим за курсором
    document.getElementById('field').addEventListener("mousemove", mousePosition);
    //Следим за кликом мышки
    document.getElementById('field').addEventListener("click", shots);
    document.getElementById('field').addEventListener('click', bugsBunny.hit);
    //Следим за вводом с клавиатуры
    document.addEventListener('keydown', keyboardClick);
    run = setInterval(GameStart, 500);
}

document.addEventListener('DOMContentLoaded', eventsListeners);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

