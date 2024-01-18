export function sortByAscString(data, nameColumn) {
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

    return result;
}

export function sortByDescString(data, nameColumn) {
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

    return result;
}

export function sortByAscResult(data, nameColumn, results) {
    let fixData = data.map(
        (d) =>
            results.some((r) => r.id === d.resultId) && {
                ...d,
                resultId: results.find((r) => r.id === d.resultId).type,
            }
    );

    const result = fixData.sort((a, b) => {
        return a[nameColumn] - b[nameColumn];
    });

    fixData = result.map(
        (d) =>
            results.some((r) => r.type === d.resultId) && {
                ...d,
                resultId: results.find((r) => r.type === d.resultId).id,
            }
    );

    return fixData;
}

export function sortByDescResult(data, nameColumn, results) {
    let fixData = data.map(
        (d) =>
            results.some((r) => r.id === d.resultId) && {
                ...d,
                resultId: results.find((r) => r.id === d.resultId).type,
            }
    );

    const result = fixData.sort((a, b) => {
        return b[nameColumn] - a[nameColumn];
    });

    fixData = result.map(
        (d) =>
            results.some((r) => r.type === d.resultId) && {
                ...d,
                resultId: results.find((r) => r.type === d.resultId).id,
            }
    );

    return fixData;
}

export function sortByAsc(data, nameColumn) {
    const result = data.sort((a, b) => {
        return a[nameColumn] - b[nameColumn];
    });

    return result;
}

export function sortByDesc(data, nameColumn) {
    const result = data.sort((a, b) => {
        return b[nameColumn] - a[nameColumn];
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

    const result = fixData.sort((a, b) => {
        if (a[nameColumn] > b[nameColumn]) {
            return 1;
        }
        if (a[nameColumn] < b[nameColumn]) {
            return -1;
        }
        return 0;
    });

    fixData = result.map(
        (d) =>
            risksRewards.some((r) => r.label === d.rrId) && {
                ...d,
                rrId: risksRewards.find((r) => r.label === d.rrId).id,
            }
    );

    return fixData;
}

export function sortByDescRR(data, nameColumn, risksRewards) {
    let fixData = data.map(
        (d) =>
            risksRewards.some((r) => r.id === d.rrId) && {
                ...d,
                rrId: risksRewards.find((r) => r.id === d.rrId).label,
            }
    );

    const result = fixData.sort((a, b) => {
        if (a[nameColumn] < b[nameColumn]) {
            return 1;
        }
        if (a[nameColumn] > b[nameColumn]) {
            return -1;
        }
        return 0;
    });

    fixData = result.map(
        (d) =>
            risksRewards.some((r) => r.label === d.rrId) && {
                ...d,
                rrId: risksRewards.find((r) => r.label === d.rrId).id,
            }
    );

    return fixData;
}

export function sortByAscDate(data, nameColumn) {
    const result = data.sort((a, b) => {
        return new Date(a[nameColumn]) - new Date(b[nameColumn]);
    });

    return result;
}

export function sortByDescDate(data, nameColumn) {
    const result = data.sort((a, b) => {
        return new Date(b[nameColumn]) - new Date(a[nameColumn]);
    });

    return result;
}
