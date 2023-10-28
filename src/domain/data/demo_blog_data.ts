import { IBlogModel } from "../models/blog";
const demoBlogData: IBlogModel[] = Array.from({ length: 10 }, (_, index) => ({
  id: Math.random().toString(36).substring(2, 7),
  categories: ["coding"],
  coverImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/blogskitter-dev.appspot.com/o/cover-images%2Fblog-cover-1698140494229_kafrr.jpg?alt=media&token=d53fb4c7-2f5e-4bed-a9cf-ebabbf7b26f7",
  createdDate: new Date().toISOString(),
  description: "Demo Description " + (index + 1),
  title: "Fake Title " + (index + 1),
  uid: "fakeuid",
}));
export const getDemoBlogData = (limit: number, skip: number) => {
  return Array.from({ length: limit }, (_, index) => ({
    id: Math.random().toString(36).substring(2, 7),
    categories: ["coding"],
    coverImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/blogskitter-dev.appspot.com/o/cover-images%2Fblog-cover-1698140494229_kafrr.jpg?alt=media&token=d53fb4c7-2f5e-4bed-a9cf-ebabbf7b26f7",
    createdDate: new Date().toISOString(),
    description: "Demo Description " + (index + 1),
    title: "Fake Title " + (index + 1),
    uid: "fakeuid",
  })).slice(skip, skip + limit);
};
export default demoBlogData;
