import fs from "fs"

export const text_numbers_regex = /[\d\.]+|\D+/g;

export function loadJSON(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

export function getHigher(firstNumber, secondNumber) {
    if (!firstNumber) return secondNumber;
    return (parseInt(firstNumber) >= parseInt(secondNumber)) ? firstNumber : secondNumber;
}