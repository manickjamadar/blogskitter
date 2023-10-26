import ApiError from "@/domain/error/api_error";
import BlogModel, { IBlogModel } from "@/domain/models/blog";
import IApiBlogService from "./i_api_blog_service";
import { adminFirestore } from "@/config/firebase_admin";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

class FirebaseApiBlogService implements IApiBlogService {
  async getBlogsByUserId(userId: string): Promise<ApiError | IBlogModel[]> {
    try {
      const blogsRef = FirebaseApiBlogService.getCollection();
      const query = blogsRef
        .orderBy("createdDate", "desc")
        .where("uid", "==", userId);
      const snapshot = await query.get();
      const blogs: IBlogModel[] = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        blogs.push(BlogModel.fromFirebase(data));
      });
      return blogs;
    } catch (error) {
      return new ApiError("Fetching Blog Failed", 400);
    }
  }
  async getBlogById(id: string): Promise<IBlogModel | ApiError> {
    try {
      const docRef = FirebaseApiBlogService.getCollection().doc(id);
      const doc = await docRef.get();
      const data = doc.data();
      if (!doc.exists || !data) {
        return new ApiError("Blog not found", 404);
      }
      return BlogModel.fromFirebase(data);
    } catch (error) {
      return new ApiError("Fetching Blog Failed", 400);
    }
  }
  static getCollection = () => {
    return adminFirestore.collection("blog");
  };
  async findBlogs(
    limit: number,
    skip: number
  ): Promise<ApiError | IBlogModel[]> {
    try {
      const blogsRef = FirebaseApiBlogService.getCollection();
      const query = blogsRef
        .orderBy("createdDate", "desc")
        .offset(skip)
        .limit(limit);
      const snapshot = await query.get();
      const blogs: IBlogModel[] = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        blogs.push(BlogModel.fromFirebase(data));
      });
      return blogs;
    } catch (error) {
      return new ApiError("Fetching Blog Failed", 400);
    }
  }
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
