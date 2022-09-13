// Функция сложения
// function sum() {
//     // Берем значения с поля ввода и вывода
//     let output = document.getElementById('output_field').value;
//     let input = parseFloat(document.getElementById('input_field').value);
//     // Проверяем корректность ввода
//     if (isNaN(input)) {
//         input = 0
//         document.getElementById('input_field').value = input;
//     }
//     // Проверка на пустоту поля вывода
//     if (output == '') {
//         output = input; 
//         document.getElementById('output_field').value = output;
//         document.getElementById('input_field').value = '';
//     }
//      else {
//         // alert(parseFloat(document.getElementById('output_field').value))
//         let sum = parseFloat(document.getElementById('output_field').value) + input;
//         document.getElementById('output_field').value = sum;
//         document.getElementById('input_field').value = '';
//     }
// }

// function difference() {
//     let output = document.getElementById('output_field').value;
//     let input = parseFloat(document.getElementById('input_field').value);
//     // Проверяем корректность ввода
//     if (isNaN(input)) {
//         input = 0
//         document.getElementById('input_field').value = input;
//     }
//     // Проверка на пустоту поля вывода
//     if (output == '') {
//         output = input; 
//         document.getElementById('output_field').value = output + "-";
//         document.getElementById('input_field').value = '';
//     } else {
//         // alert(parseFloat(document.getElementById('output_field').value))
//         let difference = parseFloat(document.getElementById('output_field').value) - input;
//         document.getElementById('output_field').value = difference + "-";
//         document.getElementById('input_field').value = '';
//     }
// }





function operation(action) {
    let output = document.getElementById('output_field').value;
    let input = document.getElementById('input_field').value;
    if (input == '') {
        document.getElementById('output_field').value = output + action;
    } else {
        if (isNaN(input)) {
            input = '';
            alert("Я не знаю как выполнять математические операции со строками...(")
        }
    }
    if (output == '') {
        output = input;
        document.getElementById('output_field').value = output + action;
        document.getElementById('input_field').value = ''
    } else { 
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


// Функция ввода чисел через кнопки, где id - это id кнопки 
function input_numbers(id) {
    // Берем новое веденное число через кнопку и старое число, что уже было введено
    let new_number = id;
    let old_number = document.getElementById('input_field').value;
    // Проверяем старое число на значение 0, потому что число не может начинаться с 0
    if (old_number == 0) {
        document.getElementById('input_field').value = new_number;
    // Если строе число не 0, тогда просто добавляем к старому числу новое см. ПРИМЕР №1 в README.md
    } else {
        document.getElementById('input_field').value = old_number + new_number;    
    }
}


// Функция удаления всего
function delete_all() {
    // Берет значение из строки ввода
    let input_field = document.getElementById('input_field').value;
    // 
    if (input_field == 0) {
        document.getElementById('output_field').value = '';
    }
    document.getElementById('input_field').value = 0; 
}

