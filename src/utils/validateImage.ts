const validateImage = (file: File): string | undefined => {
  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSizeInBytes = 1 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Please upload an image (JPEG, PNG).";
  }

  if (file.size > maxSizeInBytes) {
    return "File size is too large. Please upload an image less than 1 MB in size.";
  }

  return;
};
export default validateImage;
