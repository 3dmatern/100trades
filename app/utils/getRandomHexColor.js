export function getRandomHexColor() {
    // Генерация случайных значений для красного, зеленого и синего
    let randomRed = Math.floor(Math.random() * 256);
    let randomGreen = Math.floor(Math.random() * 256);
    let randomBlue = Math.floor(Math.random() * 256);

    // Форматирование значений в шестнадцатеричную форму и конкатенация
    let hexColor =
        "#" +
        randomRed.toString(16).padStart(2, "0") +
        randomGreen.toString(16).padStart(2, "0") +
        randomBlue.toString(16).padStart(2, "0");

    return hexColor;
}
