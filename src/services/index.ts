import FirebaseAuthService from "./auth_service/firebase_auth_service";
import FetchBlogService from "./blog_service/fetch_blog_service";

const firebaseAuthService = new FirebaseAuthService();
const fetchBlogService = new FetchBlogService();
export { firebaseAuthService as authService, fetchBlogService as blogService };
