"use client";
import Image from "next/image";

const ImgCard = ({ imageInfo, isLiked, onClick }) => {
  return (
    <div
      onClick={onClick}
      id={imageInfo?.id}
      className="cursor-pointer flex flex-col"
    >
      <div className="flex h-80 justify-center content-center align-middle">
        <Image
          src={imageInfo?.links?.download}
          alt={imageInfo?.alt_description}
          width={300}
          height={300}
        />
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex rounded-md gap-1 ">
          <Image
            src={imageInfo?.user?.profile_image?.small}
            alt={imageInfo?.user?.name}
            width={20}
            height={20}
          />
          <p className="font-bold">{imageInfo?.user?.instagram_username}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">likes {imageInfo?.likes}</p>
          {isLiked && <p>Liked</p>}
        </div>
      </div>
    </div>
  );
};
export default ImgCard;
