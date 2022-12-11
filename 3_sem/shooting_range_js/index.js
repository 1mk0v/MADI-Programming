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

let lastRabbitPositionX = 0;
let lastRabbitPositionY = 0;
let lifeOfRabbit = 3;
let shot = 0

let run;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ЭКЗЕМПЛЯР ПЕРСОНАЖА И ЕГО ФУНКЦИИ(ВОЗМОЖНОСТИ) 
//МОЖНО ЗАПИСАТЬ ДАННЫЕ ФУНКЦИИ ОТДЕЛЬНО

class Rabbit {

    //ЕГО МОЖНО ПОДСТРЕЛИТЬ
    hit() {
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

            setTimeout(() => {

                newRabbitPositionX = lastRabbitPositionX + newPathX;
                newRabbitPositionY = lastRabbitPositionY + newPathY;

                if (newRabbitPositionX < 0 || newRabbitPositionX > fieldSize()[1] - 80) {
                    while (newRabbitPositionX < 0 || newRabbitPositionX > fieldSize()[1] - 80) {
                        newPathX = getRandomInt();
                        newRabbitPositionX = lastRabbitPositionX + newPathX;
                    }
                }
        
                if (newRabbitPositionY < 0 || newRabbitPositionY > fieldSize()[0] - 80) {
                    while (newRabbitPositionY < 0 || newRabbitPositionY > fieldSize()[0] - 80) {
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
            document.getElementById('heart3').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/deadHeart.png`;
            return true;
        } 
    }
}


//СОЗДАЮ ЭКЗМЕПЛЯР ПЕРСОНАЖА

let BugsBunny = new Rabbit();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GAME

function main() {
    GameStart();
}

function GameStart() {
    if (BugsBunny.isDead()) {
        GameStop();
        return;
    }
    BugsBunny.run();
}

function GameStop() {
    clearInterval(run);
    document.getElementById('life').innerHTML = 'GAME OVER!';
    document.getElementById('rabbitIMG').src = `${document.getElementsByTagName('script')[0].src.slice(0,-8)}photo/ghost.gif`;
    document.getElementById('field').removeEventListener("click", shots);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomInt() {
    let nextPos = [-5, 0, 5];
    return nextPos[Math.floor(Math.random() * 3)];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function shots() {
    shot += 1;
    document.getElementById('shotNum').innerHTML = shot;
}

function mousePosition(event) {
    let positionX = document.getElementById('mousePositionX');
    let positionY = document.getElementById('mousePositionY');
    positionX.innerHTML = event.offsetX;
    positionY.innerHTML = event.offsetY;
}

function fieldSize() {
    let height = document.getElementById('field').clientHeight;
    let width = document.getElementById('field').clientWidth;
    document.getElementById('winH').innerHTML = height;
    document.getElementById('winW').innerHTML = width;
    let size = [height, width];
    return size;
}

function startRabbitPos() {
    let height = fieldSize()[0];
    let width = fieldSize()[1];
    lastRabbitPositionX = width/2;
    lastRabbitPositionY = height/2;
    let rabbit = document.getElementById('rabbit');
    rabbit.style.left = `${lastRabbitPositionX}px`;
    rabbit.style.top = `${lastRabbitPositionY}px`;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventsListeners() {
    startRabbitPos();
    fieldSize();
    window.addEventListener('resize', fieldSize);
    document.getElementById('field').addEventListener("mousemove", mousePosition);
    document.getElementById('field').addEventListener("click", shots);
    document.getElementById('rabbit').addEventListener('click', BugsBunny.hit);
    // document.getElementById('start').addEventListener('click', main);
}

document.addEventListener('DOMContentLoaded', eventsListeners);
document.addEventListener('DOMContentLoaded', run = setInterval(main, 500));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

