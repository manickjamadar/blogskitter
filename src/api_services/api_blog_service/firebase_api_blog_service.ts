import ApiError from "@/domain/error/api_error";
import BlogModel, { IBlogModel } from "@/domain/models/blog";
import IApiBlogService from "./i_api_blog_service";
import { adminFirestore } from "@/config/firebase_admin";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

class FirebaseApiBlogService implements IApiBlogService {
  static getCollection = () => {
    return adminFirestore.collection("blog");
  };
  async createBlog(
    blogData: BlogPostBody,
    userId: string
  ): Promise<IBlogModel | ApiError> {
    const { title, coverImageUrl, description, categories } = blogData;
    try {
      const blogDocRef = FirebaseApiBlogService.getCollection().doc();
      const blogModel = new BlogModel({
        id: blogDocRef.id,
        title,
        categories: [...(categories as string[])],
        coverImageUrl,
        description,
        uid: userId,
        createdDate: new Date().toISOString(),
      });
      await blogDocRef.create(blogModel.toFirebase());
      return blogModel.toJson();
    } catch (error) {
      return new ApiError("Blog Creation failed", 400);
    }
  }
}
export default FirebaseApiBlogService;
