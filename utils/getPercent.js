export function percentWinOfCount(win, count) {
  return Math.floor((win / count) * 100);
}

export function percentLossOfCount(loss, count) {
  return Math.ceil((loss / count) * 100);
}

export function percentAverageRisk(sumRisk, count) {
  if (sumRisk === 0 && count === 0) {
    return 0;
  }

  return +(sumRisk / count).toFixed(1);
}
