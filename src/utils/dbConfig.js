import { Level } from "level";

let db;

const currentUser = localStorage.getItem("currentUser");

export const configureDb = async () => {
  db = new Level("img-display", { valueEncoding: "json" });
  await db.put("muser1", { user: "muser1", password: "mpassword1", likes: [] });
  await db.put("muser2", { user: "muser2", password: "mpassword2", likes: [] });
};

export const getUser = async (user) => {
  const data = await db.get(user);
  return data;
};

export const likedImages = async () => {
  const user = await getUser(currentUser);
  return user.likes;
};

export const likeImage = async (imageId) => {
  const user = await getUser(currentUser);
  user.likes.push(imageId);
  await db.put(user.user, user);
};
