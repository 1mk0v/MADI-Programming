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

//КОНСТАНТЫ ЛИТРОВ
let maxLitersOfFirstJug = 0;
let maxLitersOfSecondJug = 0;
let requiredLiters = 0;


//КОНСТАНТЫ КУВШИНОВ
let divOfFirstJug = document.getElementById('firstJug');
let divOfSecondJug = document.getElementById('secondJug');


//КОНСТАНТЫ ОШИБОК
const impossible = "Impossible conditions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function main() {

    if (!Checking.prototype.firstCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug)) {
        alert('You need to enter volume of jugs!');
        return;
    }


    let oneLiterInProcentFirst = 100/maxLitersOfFirstJug;
    let oneLiterInProcentSecond = 100/maxLitersOfSecondJug;

    let divOfWaterInFirstJug = document.getElementById('waterOfFirstJug');
    let divOfWaterInSecondJug = document.getElementById('waterOfSecondJug');
    let litersOfFirstJug = 0;
    let litersOfSecondJug = 0;


    printWater(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug,litersOfSecondJug, oneLiterInProcentFirst, oneLiterInProcentSecond);
    printInJugs(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug, litersOfSecondJug);
    // print_text(litersOfFirstJug, litersOfSecondJug);

    litersOfSecondJug = litersOfSecondJug + maxLitersOfSecondJug;

    printWater(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug,litersOfSecondJug, oneLiterInProcentFirst, oneLiterInProcentSecond);
    printInJugs(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug, litersOfSecondJug);
    // print_text(litersOfFirstJug, litersOfSecondJug);

    while (litersOfFirstJug != requiredLiters || litersOfSecondJug != requiredLiters) {

        if (litersOfFirstJug == maxLitersOfFirstJug) {
            litersOfFirstJug = 0;
            if (litersOfSecondJug == 0) {
                alert(impossible);
                return;
            }
        }

        if (litersOfFirstJug + litersOfSecondJug > maxLitersOfFirstJug) {
            litersOfSecondJug = litersOfSecondJug - (maxLitersOfFirstJug - litersOfFirstJug);
            litersOfFirstJug = litersOfFirstJug +(maxLitersOfFirstJug-litersOfFirstJug);
            if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
                findedIn(litersOfFirstJug);
                return;
            }
            printWater(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug,litersOfSecondJug, oneLiterInProcentFirst, oneLiterInProcentSecond);
            printInJugs(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug, litersOfSecondJug);
            // print_text(litersOfFirstJug, litersOfSecondJug);
        } else {
            litersOfFirstJug = litersOfFirstJug + litersOfSecondJug;
            litersOfSecondJug = 0;
            printWater(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug,litersOfSecondJug, oneLiterInProcentFirst, oneLiterInProcentSecond);
            printInJugs(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug, litersOfSecondJug);
            // print_text(litersOfFirstJug, litersOfSecondJug);
            if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
                findedIn(litersOfFirstJug);
                return;
            }
            litersOfSecondJug = litersOfSecondJug+maxLitersOfSecondJug;
            printWater(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug,litersOfSecondJug, oneLiterInProcentFirst, oneLiterInProcentSecond);
            printInJugs(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug, litersOfSecondJug);
            // print_text(litersOfFirstJug, litersOfSecondJug);
            if (litersOfFirstJug == requiredLiters || litersOfSecondJug == requiredLiters) {
                findedIn(litersOfFirstJug);
                return;
            }
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function sleep(delay) { //милисекунды
    // let time = Date.now();
    // let currentTime = null;
// 
    // do {
        // currentTime = Date.now();
    // } while (currentTime - time < delay);
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function printWater(divOfWaterInFirstJug, divOfWaterInSecondJug, litersOfFirstJug,litersOfSecondJug, oneLiterInProcentFirst, oneLiterInProcentSecond) {

    if (litersOfFirstJug == 0) { 
        divOfWaterInFirstJug.style.backgroundColor = '#00000000';
    } else {
        divOfWaterInFirstJug.style.backgroundColor = 'blue';
    }

    if (litersOfSecondJug == 0) {
        divOfWaterInSecondJug.style.backgroundColor = '#00000000';
    } else { 
        divOfWaterInSecondJug.style.backgroundColor = 'blue';
    }

    divOfWaterInFirstJug.style.height = `${litersOfFirstJug * oneLiterInProcentFirst}%`;
    divOfWaterInSecondJug.style.height = `${litersOfSecondJug * oneLiterInProcentSecond}%`;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function findedIn(litersOfFirstJug) {
    if (litersOfFirstJug == requiredLiters) {
        alert('Find in first Jug');
    } else { 
        alert('Find in second Jug');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function printInJugs(divOfFirstJug, divOfSecondJug, litersOfFirstJug, litersOfSecondJug) {
    divOfFirstJug.innerHTML = litersOfFirstJug;
    divOfSecondJug.innerHTML = litersOfSecondJug;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ВВОД ДО ТЕХ ПОР, ПОКА НЕ СТАНЕТ ВЕРНЫМ
function inputVolumeOfJug(text, def) {
    let flag = true;
    let liters;
    while (flag) {
        liters = window.prompt(text, def);
        liters = parseInt(liters);
        if (isNaN(liters)) {
            alert('You must enter a number!');
        } else {
            flag = false;
        }
    }
    return liters;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preparationForWork() {
    maxLitersOfFirstJug = inputVolumeOfJug("Enter the number of liters for first jug", 5);
    maxLitersOfSecondJug = inputVolumeOfJug("Enter the number of liters for first jug", 2);
    requiredLiters = inputVolumeOfJug("Enter the number of liters you want to find", 3);  

    //ОБРАБОТКА ОШИБОК
    switch (Checking.prototype.secondCheckVolumeOfJugs(maxLitersOfFirstJug, maxLitersOfSecondJug, requiredLiters)){
        case "err1":
            alert('Error!\nYou cant find an odd number of liters');
            break;
        case "err2":
            alert('Error!\nYou cant find an even number of liters');
            break;
        case "err3":
            alert('Error!\nYou cant find more liters than there are in your jugs');
            break;
        case "err4":
            alert('Error!\nYou cant find negative liters');
            break;
        case "err5":
            alert('Error!\nYou cant find this liters');
            break;
        default:
            break;
    }

    if (maxLitersOfFirstJug < maxLitersOfSecondJug) {
        maxLitersOfFirstJug = maxLitersOfFirstJug + maxLitersOfSecondJug;
        maxLitersOfSecondJug = maxLitersOfFirstJug - maxLitersOfSecondJug;
        maxLitersOfFirstJug = maxLitersOfFirstJug - maxLitersOfSecondJug;
        alert('Okey, now first jug is second and second jug is first');
    }
    
    document.getElementById('firstJug').style.height = `100%`;
    document.getElementById('secondJug').style.height = `${100/maxLitersOfFirstJug*maxLitersOfSecondJug}%`;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function print_text(litersOfFirstJug, litersOfSecondJug) {
    a = alert(`First jug = ${litersOfFirstJug}\nSecond Jug = ${litersOfSecondJug}`);
    return a;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function clicks() {
    document.getElementById('start').addEventListener('click', main);
    document.getElementById('input').addEventListener('click', preparationForWork);
}

document.addEventListener('DOMContentLoaded', clicks);
