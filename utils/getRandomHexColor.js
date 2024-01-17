export function getRandomHexColor() {
    // Генерация случайных значений для мягких оттенков красного, зеленого и синего
    let randomRed = Math.floor(Math.random() * 156) + 100; // В диапазоне 100-255
    let randomGreen = Math.floor(Math.random() * 156) + 100; // В диапазоне 100-255
    let randomBlue = Math.floor(Math.random() * 156) + 100; // В диапазоне 100-255

    // Форматирование значений в шестнадцатеричную форму и конкатенация
    let hexColor =
        "#" +
        randomRed.toString(16).padStart(2, "0") +
        randomGreen.toString(16).padStart(2, "0") +
        randomBlue.toString(16).padStart(2, "0");

    return hexColor;
}
