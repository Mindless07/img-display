import { getLikedImages, likeImage } from "@/utils/dbConfig";
import { useState, useEffect } from "react";

export const useLikesData = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getLikedImages().then((likes) => setLikes(likes));
  }, []);

  const likeImageById = async (imageId) => {
    await likeImage(imageId);
    setLikes((prevValues) => [...prevValues, imageId]);
  };

  return { likes, likeImageById };
};
