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
    let litersOfFirstJug = inputLitersOf("Enter the number of liters for first jug", 5);
    let litersOfSecondJug = inputLitersOf("Enter the number of liters for first jug", 2);
    let requiredLiters = inputLitersOf("Enter the number of liters you want to find", 3);
    const text = "You enter liters\nFor first jug: "+litersOfFirstJug+"\nFor second jug: "+litersOfSecondJug+"\nWhich you want to find: "+requiredLiters;

    //ОБРАБОТКА ОШИБОК

    if (litersOfFirstJug == litersOfSecondJug && requiredLiters != litersOfSecondJug) {
        alert('You will only be able to find '+litersOfFirstJug+' liters');
        location.reload();
    }

    if (litersOfFirstJug == 0 || litersOfSecondJug == 0) {
        alert('You cant find anything');
        location.reload();
    }

    if (litersOfFirstJug < 0 || litersOfSecondJug < 0 || requiredLiters < 0)  {
        alert('What are you even thinking, PSYCHO!');
        location.reload();
    }

    if (litersOfFirstJug%2 == 0 && litersOfSecondJug%2 == 0 && requiredLiters%2 != 0) {
        alert('You can only find even numbers!');
        location.reload();
    }

    // if (litersOfFirstJug%2 != 0 && litersOfSecondJug%2 != 0 && requiredLiters%2 == 0) {
    //     alert('You can only find odd numbers!');
    //     location.reload();
    // }
}

