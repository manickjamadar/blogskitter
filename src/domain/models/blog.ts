import { Timestamp } from "firebase-admin/firestore";

export interface IBlogModel {
  id: string;
  title: string;
  categories: string[];
  description: string;
  uid: string;
  createdDate: string;
  coverImageUrl: string;
}
interface BlogDocument {
  id: string;
  title: string;
  categories: string[];
  description: string;
  uid: string;
  createdDate: Timestamp;
  coverImageUrl: string;
}
class BlogModel implements IBlogModel {
  public id: string;
  public title: string;
  public categories: string[];
  public description: string;
  public uid: string;
  public createdDate: string;
  public coverImageUrl: string;
  constructor(data: IBlogModel) {
    this.id = data.id;
    this.title = data.title;
    this.categories = [...data.categories];
    this.description = data.description;
    this.uid = data.uid;
    this.createdDate = data.createdDate;
    this.coverImageUrl = data.coverImageUrl;
  }
  toJson(): IBlogModel {
    return {
      id: this.id,
      title: this.title,
      categories: [...this.categories],
      coverImageUrl: this.coverImageUrl,
      uid: this.uid,
      description: this.description,
      createdDate: this.createdDate,
    };
  }
  toFirebase(): BlogDocument {
    return {
      id: this.id,
      title: this.title,
      categories: [...this.categories],
      coverImageUrl: this.coverImageUrl,
      uid: this.uid,
      description: this.description,
      createdDate: Timestamp.fromDate(new Date(this.createdDate)),
    };
  }
  static fromFirebase(data: FirebaseFirestore.DocumentData): IBlogModel {
    return {
      id: data["id"],
      title: data["title"],
      categories: [...data["categories"]],
      coverImageUrl: data["coverImageUrl"],
      uid: data["uid"],
      description: data["description"],
      createdDate: (data["createdDate"] as Timestamp).toDate().toISOString(),
    };
  }
}

export default BlogModel;
