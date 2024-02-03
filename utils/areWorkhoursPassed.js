export function areWorkhoursPassed(startDate, endDate) {
    const millisecondsInHour = 3600000;

    // Установка даты начала и конца с учетом времени
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Рассчитываем разницу в часах
    const hoursDiff = (end - start) / millisecondsInHour;

    // Переменная для подсчета прошедших рабочих часов
    let workHoursPassed = 0;

    // Итерируемся по часам между start и end
    for (let i = 0; i < hoursDiff; i++) {
        const currentHour = new Date(start.getTime() + i * millisecondsInHour);

        // Проверка, не попадает ли текущий час на выходной (суббота или воскресенье)
        if (currentHour.getDay() !== 0 && currentHour.getDay() !== 6) {
            workHoursPassed++;
        }
    }

    // Возвращаем количество прошедших рабочих часов
    return workHoursPassed;
}
