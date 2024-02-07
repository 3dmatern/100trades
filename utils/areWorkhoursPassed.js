export function areWorkhoursPassed(startDate, endDate) {
    const millisecondsInMinute = 60000;

    // Установка даты начала и конца с учетом времени
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Рассчитываем разницу в миллисекундах
    const timeDiff = end - start;

    // Переменные для подсчета прошедших рабочих часов и минут
    let workHoursPassed = 0;
    let workMinutesPassed = 0;

    // Итерируемся по минутам между start и end
    for (let i = 0; i < timeDiff / millisecondsInMinute; i++) {
        const currentMinute = new Date(
            start.getTime() + i * millisecondsInMinute
        );

        // Проверка, не попадает ли текущая минута на выходной (суббота или воскресенье)
        if (currentMinute.getDay() !== 0 && currentMinute.getDay() !== 6) {
            workMinutesPassed++;
        }
    }

    // Добавляем прошедшие минуты к часам
    workHoursPassed += Math.floor(workMinutesPassed / 60);

    // Возвращаем объект с количеством прошедших рабочих часов и минут
    return `${workHoursPassed} ч. ${workMinutesPassed % 60} мин.`;
}
