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