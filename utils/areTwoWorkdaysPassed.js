export function areTwoWorkdaysPassed(endDate) {
    const millisecondsInDay = 86400000;

    // Установка даты начала и конца с учетом времени
    const start = new Date(endDate);
    const end = new Date();

    // Рассчитываем разницу в днях
    const daysDiff = Math.floor((end - start) / millisecondsInDay);

    // Переменная для подсчета прошедших рабочих дней
    let workdaysPassed = 0;

    // Итерируемся по дням между start и end
    for (let i = 0; i <= daysDiff; i++) {
        const currentDate = new Date(start.getTime() + i * millisecondsInDay);

        // Проверка, не попадает ли текущий день на выходной (суббота или воскресенье)
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            workdaysPassed++;
        }
    }

    return workdaysPassed;
}
