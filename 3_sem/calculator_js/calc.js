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


//-------------------------------------------КОНСТАНТЫ------------------------------------------//

const infinity_str = "Бесконечность";

//---------------------------------ФУНКЦИЯ-ВВОДА-ЧИСЕЛ-------------------------------------------//

function input_numbers(id) {
    
    if (typeof id == 'object') {
        id = this.id;
    }
    
    // Берем новое веденное число через кнопку и старое число, что уже было введено
    let new_number = id;
    let old_number = document.getElementById('input_field').value;
    let output_nubmer = document.getElementById('output_field').value;

    if ((old_number.includes(".")) && new_number == ".") {
        return;
    }

    if (old_number == '' && new_number == ".") {
        document.getElementById('input_field').value = '0'+ new_number;
        return;
    }

    // Проверяем строку вывода на пустоту
    if (output_nubmer == '') {
        // Проверяем старое число на значение 0, потому что число не может начинаться с 0
        if (old_number == '0' && new_number != ".") {
            document.getElementById('input_field').value = new_number;
        // Если строе число не 0, тогда просто добавляем к старому числу новое
        } else {
            document.getElementById('input_field').value = old_number + new_number;
        }
    // Если строка не пуста, проверим, что она является числом
    } else {
        // Если строка является числом, тогда обнуляем строку вывода и добавляем в строку ввода число из вывода + нововеденное число
        if (isNaN(output_nubmer) == false) {
            if ((output_nubmer.includes(".")) && new_number == ".") {
                new_number = "";
            }
            document.getElementById('output_field').value = "";
            document.getElementById('input_field').value = output_nubmer + new_number;
        // Иначе просто добавляем новое число к старому, при условии, что там нет БЕСКОНЕЧНОСТИ
        } else {
            if (output_nubmer == infinity_str) {
                document.getElementById('output_field').value = "";
                document.getElementById('input_field').value = new_number;
            } else {
                document.getElementById('input_field').value = old_number + new_number;
            }
        }
    }
}


//---------------------------------ФУНКЦИЯ-ДЕЙСТВИЙ----------------------------------------------//
function operation(action) {

    if (typeof action == 'object') {
        action = this.id;
    }

    // Берем значения из строки ввода и вывода
    let output = document.getElementById('output_field').value;
    let input = document.getElementById('input_field').value;

    // Две строки пусты и знак действия '-'
    if ((input == '') && (output == '') && (action == '-')) {
        document.getElementById('input_field').value = action;
        return;
    }

    if ((input == '') && (output == '')) {
        alert('Введите число!')
        return;
    }
    // Строка ввода пуста
    if ((input == '') && (output != '')) {
        // Если строка ввода пуста мы просто добавляем знак действия к строке вывода
        if (isNaN(output)){
            output = output.slice(0, -1) + action;
            document.getElementById('output_field').value = output;
        } else {
            document.getElementById('output_field').value = output + action;
        }
        return;
    }

    // Строка вывода пуста
    if ((input != '-') && (output == '')) {
        output = input;
        input = '';
        document.getElementById('output_field').value = output + action;
        document.getElementById('input_field').value = input;
        return;
    }

    // Две строки не пусты
    if ((input != '') && (output != '')) {
        let calculation =  eval(parseFloat(output)+output[output.length - 1]+input);
            if (calculation == 1/0 || calculation == -1/0) {
                document.getElementById('output_field').value = infinity_str;
            } else {
                document.getElementById('output_field').value = parseFloat(calculation) + action;
                document.getElementById('input_field').value = '';
            }
        return;
    }
}


//---------------------------------ФУНКЦИЯ-ПРОЦЕНТА-------------------------------------------//
function procent() {
    let input = parseFloat(document.getElementById('input_field').value);
    let output = document.getElementById('output_field').value;
    let output_num = parseFloat(output);
    if (isNaN(output_num)) {
        alert("Я не умею искать процент от ничего!");
        return;
    }

    // Проверяем сроку ввода на Not a Number alert(numbers)
    if (isNaN(input)) {
        input = '';
        alert("Я не знаю как выполнять математические операции со строками...(");
    // Иначе делим наше число на 100 и выполняем код <output+action>
    } else {
        let action = output_num*(input/100);
        output = parseFloat(eval(output+action));
        output = output.toFixed(13);
        document.getElementById('output_field').value = parseFloat(output);
        document.getElementById('input_field').value = '';
    }
}


//---------------------------------ФУНКЦИЯ-ПЛЮС/МИНУС-------------------------------------------//
function pm() {
    let input = parseFloat(document.getElementById('input_field').value);
    // Если число не ноль тогда мы можем поменять у него знак
    if (input != 0 && input == input) {
        input = input*(-1);
        document.getElementById('input_field').value = input;
        return;
    }

    if (isNaN(input)) {
        input = '';
        document.getElementById('input_field').value = input;
        return;
    }
}


//---------------------------------ФУНКЦИЯ-РАВНО-------------------------------------------//
function equals() {
    // Берем значение из строки ввода
    let input = parseFloat(document.getElementById('input_field').value);
    let output = document.getElementById('output_field').value;
    // Проверяем значение из строки ввода на пустоту
    if (isNaN(input)) {
        alert('Введите число!');
        return;
    } else {
        // Если значение из строки ввода не строка, тогда присваиваем значению из поля ввода пустую строку
        document.getElementById('input_field').value = '';
    }

    // Проверяем значение которое получится при сложении значений полей ввода и вывода на Not a Number
    if (isNaN(output+input)) {
        // Если оно верно, то это значит, что наше выражение имеет вид (x {operation} y)
        // Проверяем результат (x {operation} y) на деление на ноль 
        
        verif_oper = eval(parseFloat(output)+output[output.length-1]+input)

        if ((verif_oper == Infinity) || (verif_oper == -Infinity)) {
            document.getElementById('output_field').value = infinity_str;
        } else {
            output = eval(parseFloat(output)+output[output.length-1]+input);
            // Если он не находит ошибки Infinity, тогда можем вывести полученное число в поле вывода
            document.getElementById('output_field').value = parseFloat(output.toFixed(13));
        }
    // Если оно соответствует типу Number, тогда это значит, что пользователь не ввёл операцию
    } else {
        alert('Выберите операцию!');
    }
}


//---------------------------------ФУНКЦИЯ-УДАЛЕНИЯ-ВСЕГО-------------------------------------------//
function delete_all() {
    document.getElementById('input_field').value = '';
    document.getElementById('output_field').value = '';
}


//---------------------------------ФУНКЦИЯ-УДАЛЕНИЯ-ПОСИМВОЛЬНО-------------------------------------------//
function backspace() {
    let input_field = document.getElementById('input_field').value;
    // slice оставляет символы от 0 до предпоследнего
    input_field = input_field.slice(0, -1);
    document.getElementById('input_field').value = input_field;
}


//----------------------------------------ВВОД-С-КЛАВИАТУРЫ-------------------------------------------//

function input_keyboard(event) {
    switch (event.key) {
        case '0':
            input_numbers(event.key);
            break;
        case '1':
            input_numbers(event.key);
            break;
        case '2':
            input_numbers(event.key);
            break;
        case '3':
            input_numbers(event.key);
            break;
        case '4':
            input_numbers(event.key);
            break;
        case '5':
            input_numbers(event.key);
            break;
        case '6':
            input_numbers(event.key);
            break;
        case '7':
            input_numbers(event.key);
            break;
        case '8':
            input_numbers(event.key);
            break;
        case '9':
            input_numbers(event.key);
            break;
        case '.':
            input_numbers(event.key);
            break;
        case '/':
            operation(event.key);
            break;
        case '*':
            operation(event.key);
            break;
        case '-':
            operation(event.key);
            break;
        case '+':
            operation(event.key);
            break;
        case 'Enter':
            equals();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Delete':
            delete_all();
            break;
        default:
            break;
        }
}

document.addEventListener('keydown', input_keyboard);



//------------------------------------------ONCLICK-------------------------------------------//


function domcl() {

    //Ищем все элементы класса number
    let numbers = document.getElementsByClassName("number");
    for (let i = 0; i < numbers.length; i++) {
        //Прослушиваем каждый из них на клик и, при условии, что клик сработает выполняем функцию input_numbers
        numbers[i].addEventListener('click', input_numbers);
    }

    //Ищем все элементы класса operation
    let operations = document.getElementsByClassName("operation");
    for (let i = 0; i < operations.length; i++) {
        //Прослушиваем каждый из них на клик и, при условии, что клик сработает выполняем функцию operation
        operations[i].addEventListener('click', operation);
    }

    // Ищем элемент по id и прослушиваем каждый из них на клик и, при условии, что клик сработает выполняем соответствующие функции
    document.getElementById("procent").addEventListener('click', procent);
    document.getElementById("pm").addEventListener('click', pm);
    document.getElementById("delete").addEventListener('click', delete_all);
    document.getElementById("output").addEventListener('click', equals);
}

//Событие на полную прогрузку html документа
document.addEventListener('DOMContentLoaded', domcl);