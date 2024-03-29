export function sortByAscString(data, nameColumn) {
    let result = [...data];
    result = data.sort((a, b) => {
        const start = a[nameColumn] ? a[nameColumn] : "";
        const end = b[nameColumn] ? b[nameColumn] : "";

        if (start > end) {
            return 1;
        }
        if (start < end) {
            return -1;
        }
        return 0;
    });

    return result;
}

export function sortByDescString(data, nameColumn) {
    let result = [...data];
    result = data.sort((a, b) => {
        const start = a[nameColumn] ? a[nameColumn] : "";
        const end = b[nameColumn] ? b[nameColumn] : "";

        if (start < end) {
            return 1;
        }
        if (start > end) {
            return -1;
        }
        return 0;
    });

    return result;
}

export function sortByAscSelect(data, nameColumn, array) {
    let fixData = data.map((d) =>
        array.some((r) => r.id === d[nameColumn])
            ? {
                  ...d,
                  [nameColumn]: array.find((r) => r.id === d[nameColumn]).type,
              }
            : d
    );

    const result = fixData.sort((a, b) => {
        return a[nameColumn] - b[nameColumn];
    });

    fixData = result.map((d) =>
        array.some((r) => r.type === d[nameColumn])
            ? {
                  ...d,
                  [nameColumn]: array.find((r) => r.type === d[nameColumn]).id,
              }
            : d
    );

    return fixData;
}

export function sortByDescSelect(data, nameColumn, array) {
    let fixData = data.map((d) =>
        array.some((r) => r.id === d[nameColumn])
            ? {
                  ...d,
                  [nameColumn]: array.find((r) => r.id === d[nameColumn]).type,
              }
            : d
    );

    const result = fixData.sort((a, b) => {
        return b[nameColumn] - a[nameColumn];
    });

    fixData = result.map((d) =>
        array.some((r) => r.type === d[nameColumn])
            ? {
                  ...d,
                  [nameColumn]: array.find((r) => r.type === d[nameColumn]).id,
              }
            : d
    );

    return fixData;
}

export function sortByAsc(data, nameColumn) {
    const result = data.sort((a, b) => {
        const start = a[nameColumn] || 0;
        const end = b[nameColumn] || 0;

        return start - end;
    });

    return result;
}

export function sortByDesc(data, nameColumn) {
    const result = data.sort((a, b) => {
        const start = a[nameColumn] || 0;
        const end = b[nameColumn] || 0;

        return end - start;
    });

    return result;
}

export function sortByAscRR(data, nameColumn, risksRewards) {
    let fixData = data.map(
        (d) =>
            risksRewards.some((r) => r.id === d.rrId) && {
                ...d,
                rrId: risksRewards.find((r) => r.id === d.rrId).label,
            }
    );

    const result = data.sort((a, b) => {
        const start = a[nameColumn] ? a[nameColumn] : "";
        const end = b[nameColumn] ? b[nameColumn] : "";
        if (start > end) {
            return 1;
        }
        if (start < end) {
            return -1;
        }
        return 0;
    });

    let newArray = [];
    fixData = result.forEach((d) => {
        if (risksRewards.some((r) => r.label === d.rrId)) {
            newArray.push({
                ...d,
                rrId: risksRewards.find((r) => r.label === d.rrId).id,
            });
        } else {
            newArray.push(d);
        }
    });

    return newArray;
}

export function sortByDescRR(data, nameColumn, risksRewards) {
    let fixData = data.map(
        (d) =>
            risksRewards.some((r) => r.id === d.rrId) && {
                ...d,
                rrId: risksRewards.find((r) => r.id === d.rrId).label,
            }
    );

    const result = data.sort((a, b) => {
        const start = a[nameColumn] ? a[nameColumn] : "";
        const end = b[nameColumn] ? b[nameColumn] : "";
        if (start < end) {
            return 1;
        }
        if (start > end) {
            return -1;
        }
        return 0;
    });

    let newArray = [];
    fixData = result.forEach((d) => {
        if (risksRewards.some((r) => r.label === d.rrId)) {
            newArray.push({
                ...d,
                rrId: risksRewards.find((r) => r.label === d.rrId).id,
            });
        } else {
            newArray.push(d);
        }
    });

    return newArray;
}

export function sortByAscDate(data, nameColumn) {
    const result = data.sort((a, b) => {
        const start = new Date(a[nameColumn]) || 0;
        const end = new Date(b[nameColumn]) || 0;

        return start - end;
    });

    return result;
}

export function sortByDescDate(data, nameColumn) {
    const result = data.sort((a, b) => {
        const start = new Date(a[nameColumn]);
        const end = new Date(b[nameColumn]);
        return end - start;
    });

    return result;
}
