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

//КОНСТАНТЫ

let maxLitersOfFirstJug;
let maxLitersOfSecondJug;
let requiredLiters;
const text = "You enter liters\nFor first jug: "+maxLitersOfFirstJug+"\nFor second jug: "+maxLitersOfSecondJug+"\nWhich you want to find: "+requiredLiters;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ГЛАВНАЯ ФУНКЦИЯ 

function main() {
    let litersOfFirstJug = 0;
    let litersOfSecondJug = 0;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

//ВВОД ДО ТЕХ ПОР, ПОКА НЕ СТАНЕТ ВЕРНЫМ
function inputLitersOf(text, def) {
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

//КОГДА ПРОГРУЗИТСЯ СТРАНИЦА
window.onload = function() {
    maxLitersOfFirstJug = inputLitersOf("Enter the number of liters for first jug", 5);
    maxLitersOfSecondJug = inputLitersOf("Enter the number of liters for first jug", 2);
    requiredLiters = inputLitersOf("Enter the number of liters you want to find", 3);
    

    //ОБРАБОТКА ОШИБОК

    if ((requiredLiters > maxLitersOfFirstJug && requiredLiters > maxLitersOfSecondJug) || (requiredLiters < 0 || maxLitersOfFirstJug < 0 || maxLitersOfSecondJug < 0)) {
        alert('Impossible conditions');
        location.reload();
    } else {
        return main();
    }
}

