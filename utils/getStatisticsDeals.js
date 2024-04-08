export function getStatHours({ deals, winID, lossID, times }) {
  let statistics = {};
  let allCountHours = 0;
  let allWinHours = 0;
  let allLossHours = 0;

  statistics = deals.reduce((acc, item) => {
    const entryHours = new Date(item.entryDate).getHours();
    const entryMinutes = new Date(item.entryDate).getMinutes();
    const itemResultId = item.resultId;

    for (const time of times) {
      const timeEntry = time.entry;
      const timeExit = time.exit;
      const statisticName = `${timeEntry}-${timeExit}`;

      if (
        acc[statisticName] &&
        entryHours >= timeEntry &&
        entryHours < timeExit
      ) {
        if (itemResultId === winID) {
          acc[statisticName].win++;
          acc[statisticName].count++;
        }

        if (itemResultId === lossID) {
          acc[statisticName].loss++;
          acc[statisticName].count++;
        }
      } else if (
        !acc[statisticName] &&
        entryHours >= timeEntry &&
        entryHours < timeExit &&
        (itemResultId === winID || itemResultId === lossID)
      ) {
        acc[statisticName] = {
          name: statisticName,
          count: 1,
          win: itemResultId === winID ? 1 : 0,
          loss: itemResultId === lossID ? 1 : 0,
        };
      }
    }

    return acc;
  }, {});

  const dealsStatHours = Object.keys(statistics)

    .map((key) => {
      allCountHours += statistics[key].count;
      allWinHours += statistics[key].win;
      allLossHours += statistics[key].loss;

      return statistics[key];
    })
    .sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      return 0;
    });

  return {
    dealsStatHours,
    allCountHours,
    allWinHours,
    allLossHours,
  };
}

export function getStatDays({ deals, winID, lossID, days }) {
  let statistics = {};
  let allCountDays = 0;
  let allWinDays = 0;
  let allLossDays = 0;

  statistics = deals.reduce((acc, item) => {
    const entryDayIndex = item.entryDate
      ? new Date(item.entryDate).getDay()
      : item.entryDate;
    const itemResultId = item.resultId;

    for (const day of days) {
      const dayName = day.name.toUpperCase();
      const dayIndex = day.index;

      if (acc[dayName] && entryDayIndex === dayIndex) {
        if (itemResultId === winID) {
          acc[dayName].win++;
          acc[dayName].count++;
        }

        if (itemResultId === lossID) {
          acc[dayName].loss++;
          acc[dayName].count++;
        }
      } else if (
        !acc[dayName] &&
        entryDayIndex === dayIndex &&
        (itemResultId === winID || itemResultId === lossID)
      ) {
        acc[dayName] = {
          name: dayName,
          dayIndex,
          count: 1,
          win: itemResultId === winID ? 1 : 0,
          loss: itemResultId === lossID ? 1 : 0,
        };
      }
    }

    return acc;
  }, {});

  const dealsStatDays = Object.keys(statistics)
    .map((key) => {
      allCountDays += statistics[key].count;
      allWinDays += statistics[key].win;
      allLossDays += statistics[key].loss;

      return statistics[key];
    })
    .sort((a, b) => {
      if (a.dayIndex > b.dayIndex) return 1;
      if (a.dayIndex < b.dayIndex) return -1;
      return 0;
    });

  return {
    dealsStatDays,
    allCountDays,
    allWinDays,
    allLossDays,
  };
}
