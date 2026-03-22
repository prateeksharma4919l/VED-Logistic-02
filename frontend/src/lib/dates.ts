export function formatLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatLocalMonth(date = new Date()) {
  return formatLocalDate(date).slice(0, 7);
}

export function formatLocalDateTimeInput(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${formatLocalDate(date)}T${hours}:${minutes}`;
}

export function isSameLocalDate(value: string | Date, compareWith = new Date()) {
  return formatLocalDate(new Date(value)) === formatLocalDate(compareWith);
}
