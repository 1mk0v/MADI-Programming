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
var mousePositionX=0;
var mousePositionY=0;
var lastAimPositionX = 0;
var lastAimPositionY = 0;
var lastRabbitPositionX = 0;
var lastRabbitPositionY = 0;
var lifeOfRabbit = 3;
var shot = 0;

var run;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЭКЗЕМПЛЯР ПЕРСОНАЖА И ЕГО ФУНКЦИИ(ВОЗМОЖНОСТИ) 
//МОЖНО ЗАПИСАТЬ ДАННЫЕ ФУНКЦИИ ОТДЕЛЬНО

class Rabbit {

    //ЕГО МОЖНО ПОДСТРЕЛИТЬ
    hit(event) {
        if (isReadyToHit(event)){
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

                document.getElementById('rabbitPositionX').innerHTML = lastRabbitPositionX;
                document.getElementById('rabbitPositionY').innerHTML = lastRabbitPositionY;
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

let BugsBunny = new Rabbit();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GAME

function GameStart() {
    if (BugsBunny.isDead()) {
        GameStop();
        return;
    }
    BugsBunny.run();
}

function GameStop() {
    clearInterval(run);
    document.getElementById('field').removeEventListener("click", shots);
    document.getElementById('rabbitIMG').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/ghost.gif`;
    document.getElementById('life').innerHTML = 'GAME OVER!';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//НОВЫЙ ПУТЬ
function getRandomInt() {
    let nextPos = [-5, 0, 5];
    return nextPos[Math.floor(Math.random() * 3)];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГОТОВНОСТЬ К УДАРУ

function isReadyToHit(event) {
    let pi = 3.1415926535;
    let rabbirOpt = document.getElementById('rabbit').getBoundingClientRect();
    let aimOpt = document.getElementById('aim').getBoundingClientRect();
    let maxDistans = Math.sqrt(Math.pow(rabbirOpt.width,2)*2)/2;
    let distansBetweenPoints = 0;
    let vectorAim = [(aimOpt.left - rabbirOpt.left), (aimOpt.top - rabbirOpt.top)];
    let vectorRabbit = [(rabbirOpt.right - rabbirOpt.left), (rabbirOpt.bottom - rabbirOpt.top)];
    let cos = (vectorRabbit[0]*vectorRabbit[1] + vectorAim[0]*vectorAim[1])/(Math.sqrt(vectorAim[0]*vectorAim[0] + vectorRabbit[0]*vectorRabbit[0]) * Math.sqrt(vectorAim[1]*vectorAim[1] + vectorRabbit[1]*vectorRabbit[1]));
    if (event) {
        //Относительно мышки
        //Расстояние между точками. (высчитывал по формуле длины вектора между двумя точками )
        distansBetweenPoints = Math.sqrt(Math.pow((lastRabbitPositionX+(rabbirOpt.width/2)-mousePositionX), 2) + Math.pow((lastRabbitPositionY+(rabbirOpt.height/2)-mousePositionY),2));
    } else {
        //Относительно картинки
        let aimPosX = aimOpt.left - fieldSize()[2];
        let aimPosY = aimOpt.top - fieldSize()[3];
        distansBetweenPoints = Math.sqrt(Math.pow((lastRabbitPositionX+(rabbirOpt.width/2)-aimPosX-(aimOpt.width/2)), 2) + Math.pow((lastRabbitPositionY+(rabbirOpt.height/2)-aimPosY-(aimOpt.height/2)),2)); 
    }

    if (distansBetweenPoints > 0 && distansBetweenPoints < maxDistans){
        let angleRadians = Math.acos(cos);
        let angleDegrees = (angleRadians*180)/pi;
        if (angleDegrees > 0 && angleDegrees < 90) {
            return true
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//УПРАВЛЕНИЕ КЛАВИАТУРОЙ
//Ошибки
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
        document.getElementById('aimPositionY').innerHTML =lastAimPositionY;
    }
}

function aimLEFT() {
    if (lastAimPositionX - 8 > fieldSize()[2]) {
        lastAimPositionX = lastAimPositionX - 8;
        document.getElementById('aim').style.left = `${lastAimPositionX}px`;
        document.getElementById('aimPositionX').innerHTML =lastAimPositionX;
    }
}

function aimRIGHT() {
    if (lastAimPositionX + 8 < fieldSize()[2]+fieldSize()[1]-80) {
        lastAimPositionX = lastAimPositionX + 8;
        document.getElementById('aim').style.left = `${lastAimPositionX}px`;
        document.getElementById('aimPositionX').innerHTML = lastAimPositionX;
    }
}

function aimDOWN() {
    if (lastAimPositionY + 8 < fieldSize()[3]+fieldSize()[0]-80) {
        lastAimPositionY = lastAimPositionY + 8;
        document.getElementById('aim').style.top = `${lastAimPositionY}px`;
        document.getElementById('aimPositionY').innerHTML =lastAimPositionY;
    }
}

function aimHIT() {
    shots();
    BugsBunny.hit();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Считает количество выстрелов
function shots() {
    if (!BugsBunny.isDead()){
        shot += 1;
        document.getElementById('shotNum').innerHTML = shot;
    }
    
}

//Вычисление позиции курсора
//Курсор вычисляется относительно всего окна
function mousePosition(event) {
    let aimOpt = document.getElementById('aim').getBoundingClientRect()
    let aim = document.getElementById('aim');
    let aimPosX = document.getElementById('aimPositionX');
    let aimPosY = document.getElementById('aimPositionY');
    //Поле срабатывания прицела
    let activeAim = 0 <= event.offsetX && event.offsetX <= fieldSize()[1] && 0 <= event.offsetY && event.offsetY <= fieldSize()[0];
    if (activeAim) {
        document.getElementById('field').style.cursor = 'none';
        mousePositionX = event.offsetX;
        mousePositionY = event.offsetY;
        lastAimPositionX = mousePositionX+fieldSize()[2]-aimOpt.width/2;
        lastAimPositionY = mousePositionY+fieldSize()[3]-aimOpt.height/2;
        aimPosX.innerHTML = lastAimPositionX-fieldSize()[2];
        aimPosY.innerHTML = lastAimPositionY-fieldSize()[3];
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
    document.getElementById('rabbitPositionX').innerHTML = lastRabbitPositionX;
    document.getElementById('rabbitPositionY').innerHTML = lastRabbitPositionY;
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
    document.getElementById('field').addEventListener('click', BugsBunny.hit);
    //Следим за вводом с клавиатуры
    document.addEventListener('keydown', keyboardClick);
}

document.addEventListener('DOMContentLoaded', eventsListeners);
document.addEventListener('DOMContentLoaded', run = setInterval(GameStart, 500));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

