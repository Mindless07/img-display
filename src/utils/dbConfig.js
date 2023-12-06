import { Level } from "level";

let db;

const currentUser = localStorage.getItem("currentUser") || "test";

export const configureDb = async () => {
  db = new Level("img-display", { valueEncoding: "json" });
  const mUser1 = db.get("muser1");
  if (!mUser1) {
    await db.put("muser1", {
      user: "muser1",
      password: "mpassword1",
      likes: [],
    });
    await db.put("muser2", {
      user: "muser2",
      password: "mpassword2",
      likes: [],
    });
  }
};

export const getUser = async (user) => {
  const data = await db.get(user);
  return data;
};

export const getCurrentUser = async () => {
  const data = await db.get(currentUser);
  return data;
};
export const getLikedImages = async (user) => {
  const data = await db.get(`${user}likes`);
  return data;
};

export const getLikedImagesByCurrentUser = async () =>
  await getLikedImages(currentUser);

export const likedImages = async () => {
  const user = await getUser(currentUser);
  return user.likes;
};

export const likeImage = async (imageId) => {
  const user = await getCurrentUser();
  user.likes.push(imageId);
  await db.put(currentUser, user);
};
