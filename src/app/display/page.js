"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "@/utils/useAuth";
import { apiClient } from "@/utils/network";
import { useLikesData } from "./useLikesData";

import ImgCard from "@/components/organism/ImgCard";

export default function ImageListing() {
  const router = useRouter();

  const { user } = useAuth();
  const { likes, likeImageById } = useLikesData();

  const [imgFeed, setImgFeed] = useState([]);
  const { data, isFetching, isSuccess, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["imageListingQuery"],
      queryFn: async ({ pageParam = 1 }) => {
        const params = new URLSearchParams({
          page: pageParam,
        });
        return apiClient(`https://api.unsplash.com/photos?${params}`).then(
          (res) => res.json()
        );
      },
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
    });

  const onScroll = (e) => {
    const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget;

    if (Math.round(scrollTop + offsetHeight) !== scrollHeight) {
      return;
    }

    if (!isFetchingNextPage) fetchNextPage();
  };

  const handleImageClick = async (e) => {
    await likeImageById(e.currentTarget.id);
  };

  useEffect(() => {
    if (
      data &&
      data.pages.flat(1).length > 0 &&
      !isFetching &&
      !isFetchingNextPage
    )
      setImgFeed((prevValues) => [...prevValues, ...data?.pages.flat(1)]);
  }, [isFetchingNextPage, isFetching, data]);

  if (!user) router.push("/");

  if (isFetching) return <div>isfetching</div>;
  if (isSuccess)
    return (
      <div className="p-12 mb-2 h-full overflow-y-scroll" onScroll={onScroll}>
        <div className="flex flex-wrap gap-2">
          {imgFeed.length > 0 &&
            imgFeed.map((image, index) => (
              <ImgCard
                onClick={handleImageClick}
                key={image?.id + index}
                imageInfo={image}
                isLiked={likes.includes(image?.id)}
              />
            ))}
          {isFetchingNextPage && (
            <div className="text-xl"> fetching next page</div>
          )}
        </div>
      </div>
    );
}
