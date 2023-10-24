function formatFullName(fullName: string) {
  const namesArray = fullName.trim().split(" ");
  if (namesArray.length === 1) {
    return namesArray[0];
  } else if (namesArray.length > 1) {
    const firstName = namesArray[0];
    const otherNames = namesArray.slice(1);
    const formattedOtherNames = otherNames.map((name) =>
      name.charAt(0).toUpperCase()
    );
    return `${firstName} ${formattedOtherNames.join(".")}`;
  }
  return "";
}
export default formatFullName;
