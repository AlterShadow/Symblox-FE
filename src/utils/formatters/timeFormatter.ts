// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function timeFormatter(timestamp: number) {
  // const days = Number(timestamp / (24 * 60 * 60));
  // const hours = Number((timestamp % (60 * 60)) % 24);
  // const minutes = Number((timestamp % 60) % 60);
  // console.log("Days:", days, hours, minutes);
  // if (Number.isNaN(days) || Number.isNaN(hours) || Number.isNaN(minutes)) {
  //   return "00D " + "00H " + "00M";
  // }
  // const formattedDays = days.toString().slice(0, days.toString().indexOf("."));
  // const formattedHours = hours
  //   .toString()
  //   .slice(0, hours.toString().indexOf("."));
  // const formattedMinutes = minutes
  //   .toString()
  //   .slice(0, minutes.toString().indexOf("."));
  // return formattedDays + "D " + formattedHours + "H " + formattedMinutes + "M";

  const date = new Date(timestamp);
  const dateString = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  console.log(`Date: ${dateString}`);
  console.log(`Hours: ${hours}`);
  console.log(`Minutes: ${minutes}`);

  return dateString + "D " + hours + "H " + minutes + "M";
}
