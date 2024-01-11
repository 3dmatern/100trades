export function getTimeInTrade(start, end) {
    let startDate;
    let endDate;

    if (start && end) {
        startDate = new Date(start);
        endDate = new Date(end);
    } else if (start && !end) {
        startDate = new Date(start);
        endDate = new Date();
    }

    // Вычислить разницу в миллисекундах
    const timeDifference = endDate - startDate;

    // Извлечь часы и минуты из разницы в миллисекундах
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    // const minutes = Math.floor(
    //     (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    // );

    return `${hours} ч.`;
}
