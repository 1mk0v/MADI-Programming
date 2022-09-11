function plus() {
    let first = parseFloat(document.getElementById('first').value);
    if (isNaN(first)) {
        first = 0;
        document.getElementById('first').value = first;
    }
    let second = parseFloat(document.getElementById('second').value);
    if (isNaN(second)) {
        second = 0;
        document.getElementById('second').value = second;
    }
    let sum = first + second;
    document.getElementById("sum").value = parseFloat(sum.toFixed(9));
}

function equals() {
    let operation = parseFloat(document.getElementById('input_field').value);
    if (isNaN(operation)) {
        operation = 0;
        alert("Я не знаю как выполнять математические операции со строками...(")
    }
    document.getElementById('output_field').value = operation;
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