import { IBlogModel } from "@/domain/models/blog";

const fromFirebaseToBlogModel = (
  data: FirebaseFirestore.DocumentData
): IBlogModel => {
  return {
    id: data["id"],
    title: data["title"],
    categories: [...data["categories"]],
    coverImageUrl: data["coverImageUrl"],
    uid: data["uid"],
    description: data["description"],
    createdDate: (data["createdDate"] as any).toDate().toISOString(),
  };
};
export default fromFirebaseToBlogModel;
