export function determineTextColor(hexColor) {
    // Преобразуем шестнадцатеричное значение цвета в RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    // Расчет яркости цвета по формуле
    // (299 * R + 587 * G + 114 * B) / 1000
    let brightness = (299 * r + 587 * g + 114 * b) / 1000;

    // Выбор цвета текста в зависимости от яркости
    return brightness > 128 ? "black" : "white";
}
