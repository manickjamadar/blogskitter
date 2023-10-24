function formatDate(date: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const suffixes = ["th", "st", "nd", "rd"];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  return `${day}${suffix} ${months[monthIndex]} ${year}`;
}
export default formatDate;
