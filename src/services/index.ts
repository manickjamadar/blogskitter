import FirebaseAuthService from "./auth_service/firebase_auth_service";
import FetchBlogService from "./blog_service/fetch_blog_service";
import FirebaseStorageService from "./storage_service/firebase_storage_service";

const firebaseAuthService = new FirebaseAuthService();
const fetchBlogService = new FetchBlogService();
const firebaseStorageService = new FirebaseStorageService();
export {
  firebaseAuthService as authService,
  fetchBlogService as blogService,
  firebaseStorageService as storageService,
};
