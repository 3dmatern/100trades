export function areTwoWorkdaysPassed(endDate) {
    // Создаем объект даты с указанным временем завершения сделки и часовым поясом пользователя
    const completionDate = new Date(endDate);
    completionDate.setTime(
        completionDate.getTime() +
            completionDate.getTimezoneOffset() * 60 * 1000
    );
    completionDate.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    // Получаем текущую дату и время в часовом поясе пользователя
    const currentDate = new Date();
    currentDate.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    // Исключаем выходные дни
    while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        currentDate.setDate(currentDate.getDate() - 1);
    }

    // Вычисляем разницу в миллисекундах
    const elapsedTime = currentDate - completionDate;

    return elapsedTime;
}
