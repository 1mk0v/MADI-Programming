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
        alert(calculation)
        if (isFinite(calculation)) {
            alert("Бесконечность не предел")
        } else {
            document.getElementById('output_field').value = calculation + action;
            document.getElementById('input_field').value = '';
        }
        
    }
}

// Знак равно
function equals() {
    let input = parseFloat(document.getElementById('input_field').value);
    if (isNaN(input)) {
        input = 0;
        alert("Я не знаю как выполнять математические операции со строками...(")
    }
    document.getElementById('input_field').value = ''
    let output = document.getElementById('output_field').value;
    if (isNaN(output+input)) {
        document.getElementById('output_field').value = eval(output + input);
    } else {
        alert('Выберите операцию!')
    }
}


function input_numbers(id) {
    let new_number = id;
    let old_number = document.getElementById('input_field').value;
    if (old_number == 0) {
        document.getElementById('input_field').value = new_number;
    } else {
        document.getElementById('input_field').value = old_number + new_number;    
    }
}

function delete_all() {
    let input_field = document.getElementById('input_field').value;
    if (input_field == 0) {
        document.getElementById('output_field').value = '';
    }
    document.getElementById('input_field').value = 0; 
}

