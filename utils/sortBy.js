export function sortByAsc(data) {
    const result = data.sort((a, b) => {
        return a - b;
    });

    return result;
}

export function sortByDesc(data) {
    const result = data.sort((a, b) => {
        return b - a;
    });

    return result;
}

export function sortByAscString(data) {
    const result = data.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    });

    return result;
}

export function sortByDescString(data) {
    const result = data.sort((a, b) => {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    });

    return result;
}
