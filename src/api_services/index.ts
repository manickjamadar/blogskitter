import FirebaseApiAuthService from "./api_auth_service/firebase_api_auth_service";
import FirebaseApiBlogService from "./api_blog_service/firebase_api_blog_service";

const firebaseApiAuthService = new FirebaseApiAuthService();
const firebaseApiBlogService = new FirebaseApiBlogService();
export {
  firebaseApiAuthService as apiAuthService,
  firebaseApiBlogService as apiBlogService,
};
