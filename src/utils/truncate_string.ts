function truncateString(str: string, length: number) {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
}
export default truncateString;
