import { IBlogModel } from "../models/blog";
const demoBlogData: IBlogModel[] = Array.from({ length: 10 }, (_, index) => ({
  id: Math.random().toString(36).substring(2, 7),
  categories: ["coding"],
  coverImageUrl: "https://asdf.google.com",
  createdDate: new Date().toISOString(),
  description: "Demo Description " + (index + 1),
  title: "Fake Title " + (index + 1),
  uid: "fakeuid",
}));
export const getDemoBlogData = (limit: number, skip: number) => {
  return demoBlogData.slice(skip, skip + limit);
};
export default demoBlogData;
