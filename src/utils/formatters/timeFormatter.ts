// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function timeFormatter(timestamp: number) {
  const date = new Date(timestamp);
  const dateString = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return dateString + "D " + hours + "H " + minutes + "M";
}
