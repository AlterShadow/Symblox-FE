export function timeFormatter(timestamp: any) {
  console.log("======>,", timestamp);
  const days = Number(timestamp / (24 * 60 * 60));
  const hours = Number((timestamp / (60 * 60)) % 24);
  const minutes = Number((timestamp / 60) % 60);

  console.log("++++++++++++++++++", days, hours, minutes);

  if (isNaN(days) || isNaN(hours) || isNaN(minutes)) {
    return "00D 00H 00M"; // Return a default value if the input is invalid
  }

  const formattedDays = days.toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedDays}D${formattedHours}H${formattedMinutes}M`;
}
