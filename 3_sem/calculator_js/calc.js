// Функция действий, где action - это знак действия
function operation(action) {
    // Берем значения из строки ввода и вывода
    let output = document.getElementById('output_field').value;
    let input = document.getElementById('input_field').value;
    // Проверяем на пустоту строку ввода
    if (input == '') {
        // Если строка ввода пуста мы просто добавляем знак действия к строке вывода
        document.getElementById('output_field').value = output + action;
    } else {
        // Иначе мы проверяем строку ввода на Not a Number
        if (isNaN(input)) {
            input = '';
            alert("Я не знаю как выполнять математические операции со строками...(")
        }
    }

    //switch case +-*%

    // Проверяем строку вывода на пустоту
    if (output == '') {
        // Если истинно, тогда присваиваем переменной output значения ввода и строке вывода, то что мы ввели + знак действия
        output = input;
        document.getElementById('output_field').value = output + action;
        // Естественно строку ввода обнуляем, чтобы пользователь смог ввести новое число
        document.getElementById('input_field').value = ''
    } else {
        // Если ложно, тогда считаем выполняем код (output+input)
        let calculation =  eval(output+input);
        if (calculation == 1/0) {
            alert("Бесконечность не предел")
        } else {
            document.getElementById('output_field').value = calculation + action;
            document.getElementById('input_field').value = '';
        }
    }
}


// Знак равно
function equals() {

    // Берем значение из строки ввода 
    let input = parseFloat(document.getElementById('input_field').value);
    let output = document.getElementById('output_field').value;
    // Проверяем значение из строки ввода на Not a Number
    if (isNaN(input)) {
        input = 0;
        alert("Я не знаю как выполнять математические операции со строками...(")
    } else {
        // Если значение из строки ввода не строка, тогда присваиваем значению из поля ввода пустую строку
        document.getElementById('input_field').value = '';   
    }

    // Проверяем значение которое получится при сложении значений полей ввода и вывода на Not a Number
    if (isNaN(output+input)) {
        // Если оно верно, то это значит, что наше выражение имеет вид (x {operation} y)

        // Проверяем результат (x {operation} y) на деление на ноль 
        if (eval(output+input) == Infinity) {
            document.getElementById('output_field').value = 'Бесконечность';
        } else {
            // Если он не находит ошибки Infinity, тогда можем вывести полученное число в поле вывода
            document.getElementById('output_field').value = eval(output + input);
        }

    // Если оно соответствует типу Number, тогда это значит, что пользователь не ввёл операцию
    } else {
        alert('Выберите операцию!')
    }
}


function procent() {
    let output = document.getElementById('output_field').value;
    if (output.search(/[*]/) != -1) {
        let input = parseFloat(document.getElementById('input_field').value);
        // Иначе мы проверяем строку ввода на Not a Number
        if (isNaN(input)) {
            input = '';
            alert("Я не знаю как выполнять математические операции со строками...(");
        } else {
            action = input/100;
            output = eval(output+action);
            document.getElementById('output_field').value = output;
            document.getElementById('input_field').value = '';
        }
    } else {
        alert("Нельзя выполнять данную операцию!")
    }
}



// Функция ввода чисел через кнопки, где id - это id кнопки 
function input_numbers(id) {
    // Берем новое веденное число через кнопку и старое число, что уже было введено
    let new_number = id;
    let old_number = document.getElementById('input_field').value;
    let output_nubmer = document.getElementById('output_field').value;
    // Проверяем строку вывода на пустоту
    if (output_nubmer == '') {
        // Проверяем старое число на значение 0, потому что число не может начинаться с 0
        if (old_number == 0) {
            document.getElementById('input_field').value = new_number;
        // Если строе число не 0, тогда просто добавляем к старому числу новое см. ПРИМЕР №1 в README.md
        } else {
            document.getElementById('input_field').value = old_number + new_number;
        }
    // Если строка не пуста, проверим, что она является числом
    } else {
        // Если строка является числом, тогда обнуляем строку вывода и добавляем в строку ввода число из вывода + нововеденное число
        if (isNaN(output_nubmer) == false) {
            document.getElementById('output_field').value = '';
            document.getElementById('input_field').value = output_nubmer + new_number;
        // Иначе просто добавляем новое число к старому см. ПРИМЕР №1 в README.md
        } else {
            document.getElementById('input_field').value = old_number + new_number;
        }
    }
}


// Функция удаления всего
function delete_all() {
    // Берет значение из строки ввода
    let input_field = document.getElementById('input_field').value;
    // Если в строке ввода 0, тогда он удаляет все содержимое в строке выводе
    if (input_field == 0) {
        document.getElementById('output_field').value = '';
    } else {
        // Иначе он в строку ввода пишет 0
        document.getElementById('input_field').value = 0;
    }
}


// Функция удаления посимвольно
function backspace() {
    let input_field = document.getElementById('input_field').value;
    input_field = input_field.slice(0, -1);
    document.getElementById('input_field').value = input_field;
}



//----------------------------------ОПАСНАЯ-ШТУКА-ВВОД-С-КЛАВИАТУРЫ-------------------------------------------//

document.addEventListener('keydown', function(event) {
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
            // alert(event.key);
            break;
        }
    }
);

//----------------------------------------ФУНКЦИИ-УПРОЩЕНИЯ-КОДА--------------------------------------------//

// function check_on_null(input) {
//     if (input == '') {
//         // Если строка ввода пуста мы просто добавляем знак действия к строке вывода
//         document.getElementById('output_field').value = output + action;
//     } else {
//         // Иначе мы проверяем строку ввода на Not a Number
//         if (isNaN(input)) {
//             input = '';
//             alert("Я не знаю как выполнять математические операции со строками...(")
//         }
//     }
// }