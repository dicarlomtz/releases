const text_numbers_regex = /[\d\.]+|\D+/g;

function loadJson(file_path) {
    return require(file_path);
}

function getHigher(firstNumber, secondNumber) {
    return (firstNumber >= secondNumber) ? firstNumber : secondNumber;
}