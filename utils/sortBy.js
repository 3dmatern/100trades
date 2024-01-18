export function sortByAsc(data, nameColumn) {
    console.log(data, nameColumn);
    const result = data.sort((a, b) => {
        console.log(a[nameColumn], b[nameColumn]);
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

export function sortByAscString(data, nameColumn) {
    const result = data.sort((a, b) => {
        if (a[nameColumn] > b[nameColumn]) {
            return 1;
        }
        if (a[nameColumn] < b[nameColumn]) {
            return -1;
        }
        return 0;
    });

    return result;
}

export function sortByDescString(data, nameColumn) {
    const result = data.sort((a, b) => {
        if (a[nameColumn] < b[nameColumn]) {
            return 1;
        }
        if (a[nameColumn] > b[nameColumn]) {
            return -1;
        }
        return 0;
    });

    return result;
}
