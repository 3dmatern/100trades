export const typeSortDown = (dbName) => {
    switch (dbName) {
        case "name":
            return "Sort A -> Z";
        case "take":
            return "Sort A -> Z";
        case "notes":
            return "Sort A -> Z";
        case "resultId":
            return "Sort First -> Last";
        case "rrId":
            return "Sort First -> Last";

        default:
            return "Sort 1 -> 9";
    }
};

export const typeSortUp = (dbName) => {
    switch (dbName) {
        case "name":
            return "Sort Z -> A";
        case "take":
            return "Sort Z -> A";
        case "notes":
            return "Sort Z -> A";
        case "resultId":
            return "Sort Last -> First";
        case "rrId":
            return "Sort Last -> First";

        default:
            return "Sort 9 -> 1";
    }
};
