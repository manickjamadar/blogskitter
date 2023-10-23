const generateSafeFileName = (file: File) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 7);
  const fileExtension = file.name.split(".").pop();

  return `${timestamp}_${randomString}${
    fileExtension ? "." + fileExtension : ""
  }`;
};
export default generateSafeFileName;
