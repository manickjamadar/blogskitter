import ApiError from "@/domain/error/api_error";
import BlogModel, { IBlogModel } from "@/domain/models/blog";
import IApiBlogService from "./i_api_blog_service";
import { adminFirestore } from "@/config/firebase_admin";
import { BlogPostBody } from "@/schemas/blog_post_body_schema";

class FirebaseApiBlogService implements IApiBlogService {
  async deleteBlog(id: string): Promise<void | ApiError> {
    try {
      const blogDocRef = FirebaseApiBlogService.getCollection().doc(id);
      await blogDocRef.delete();
    } catch (error) {
      return new ApiError("Blog deletion failed", 400);
    }
  }
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
  async updateBlog({
    blogData,
    blogId,
  }: {
    blogData: Partial<BlogPostBody>;
    blogId: string;
  }): Promise<IBlogModel | ApiError> {
    const { title, coverImageUrl, description, categories } = blogData;
    try {
      const oldBlogOrError = await this.getBlogById(blogId);
      if (oldBlogOrError instanceof ApiError) {
        return oldBlogOrError;
      }
      const blogModel = new BlogModel({
        id: oldBlogOrError.id,
        title: title || oldBlogOrError.title,
        categories: categories
          ? [...(categories as string[])]
          : [...oldBlogOrError.categories],
        coverImageUrl: coverImageUrl || oldBlogOrError.coverImageUrl,
        description: description || oldBlogOrError.description,
        uid: oldBlogOrError.uid,
        createdDate: new Date().toISOString(),
      });
      const blogDocRef = FirebaseApiBlogService.getCollection().doc(
        oldBlogOrError.id
      );
      await blogDocRef.set(blogModel.toFirebase(), { merge: true });
      return blogModel.toJson();
    } catch (error) {
      return new ApiError("Blog Updating failed", 400);
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
