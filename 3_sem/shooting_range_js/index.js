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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Rabbit {

    hit() {
        lifeOfRabbit = lifeOfRabbit -1;
        switch (lifeOfRabbit) {
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

    run() {
        let rabbit = document.getElementById('rabbit');
        let newPathX = getRandomInt();
        let newPathY = getRandomInt();
        let newRabbitPositionX = lastRabbitPositionX + newPathX;
        let newRabbitPositionY = lastRabbitPositionY + newPathY;

        for (let i = 0; i<3; i++) {

            if (newRabbitPositionX < 0) {
                while (newRabbitPositionX < 0 || newRabbitPositionX > fieldSize()[0]) {
                    newPathX = getRandomInt();
                    newRabbitPositionX = lastRabbitPositionX +  newPathX;
                }
            }
    
            if (newRabbitPositionY < 0) {
                while (newRabbitPositionY < 0 || newRabbitPositionY > fieldSize()[1]) {
                    newPathY = getRandomInt();
                    newRabbitPositionY = lastRabbitPositionY + newPathY;
                }
            }
            rabbit.style.left = `${newRabbitPositionX + newPathX}px`;
            rabbit.style.top = `${newRabbitPositionY + newPathX}px`;
            newRabbitPositionX = newRabbitPositionX + newPathX;
            newRabbitPositionY = newRabbitPositionY + newPathY;
        }

        lastRabbitPositionX = newRabbitPositionX;
        lastRabbitPositionY = newRabbitPositionY;
    }

    isDead() {
        if (lifeOfRabbit <= 0) {
            return true;
        } 
    }
}

let BugsBunny = new Rabbit;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main() {
    document.getElementById('rabbit').addEventListener('click', BugsBunny.hit);
    GameStart();
}

function GameStart() {

    if (BugsBunny.isDead()) {
        alert('Game Over!');
        return;
    }
    BugsBunny.run();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomInt() {
    let nextPos = [-10, 0, 10];
    return nextPos[Math.floor(Math.random() * 3)];
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mousePosition(event) {
    let positionX = document.getElementById('positionX');
    let positionY = document.getElementById('positionY');
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function eventsListeners() {
    fieldSize();
    window.addEventListener('resize', fieldSize);
    document.getElementById('field').addEventListener("mousemove", mousePosition);
    document.getElementById('start').addEventListener('click', main);
}

window.addEventListener('DOMContentLoaded', eventsListeners);
