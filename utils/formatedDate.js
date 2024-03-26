export function dealDateWithTime(date) {
  const oldDate = new Date(date);
  const day = String(oldDate.getDate()).padStart(2, "0");
  const month = String(oldDate.getMonth() + 1).padStart(2, "0");
  const year = oldDate.getFullYear();
  const hours = String(oldDate.getHours()).padStart(2, "0");
  const minutes = String(oldDate.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function dealLimitionDateWithTime(date) {
  const oldDate = new Date(date);
  const day = String(oldDate.getDate()).padStart(2, "0");
  const month = String(oldDate.getMonth() + 1).padStart(2, "0");
  const year = oldDate.getFullYear();
  const hours = String(oldDate.getHours()).padStart(2, "0");
  const minutes = String(oldDate.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function currentDate() {
  const getDate = new Date();
  const day = String(getDate.getDate()).padStart(2, "0");
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const year = getDate.getFullYear();
  return `${year}.${month}.${day}`;
}

export function currentTime() {
  const getDate = new Date();
  const hours = String(getDate.getHours()).padStart(2, "0");
  const minutes = String(getDate.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
