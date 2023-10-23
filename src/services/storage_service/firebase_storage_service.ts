import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import IStorageService from "./i_storage_service";
import { storage } from "@/config/firebase";
import generateSafeFileName from "@/utils/generate_safe_file_name";

class FirebaseStorageService extends IStorageService {
  async getCoverImageUrl(image: File): Promise<string | Error> {
    try {
      const imageName = `blog-cover-${generateSafeFileName(image)}`;
      const imageRef = ref(storage, `cover-images/${imageName}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      return new Error("Uploading Image Failed");
    }
  }
}
export default FirebaseStorageService;
