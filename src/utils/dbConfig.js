import { Level } from "level";
import { currentUserKey } from "./constantes";

let db;

export const configureDb = async () => {
  db = new Level("imgdisplay", {
    valueEncoding: "json",
    createIfMissing: true,
  });
  const mUser1 = await db.get("muser1");
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
  const data = await db.get(currentUserKey);
  return data;
};

export const getLikedImages = async () => {
  const user = await getUser(currentUserKey);
  return user?.likes;
};

export const likeImage = async (imageId) => {
  const user = await getCurrentUser();
  user.likes.push(imageId);
  await db.put(currentUserKey, user);
  return user.likes;
};
