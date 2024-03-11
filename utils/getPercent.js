export function percentWinOfCount(win, count) {
    return Math.floor((win / count) * 100);
}

export function percentLossOfCount(loss, count) {
    return Math.ceil((loss / count) * 100);
}
