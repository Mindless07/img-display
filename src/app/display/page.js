"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "@/utils/auth";
import { apiClient } from "@/utils/network";
import ImgCard from "@/components/organism/ImgCard";

export default function ImageListing() {
  const { user } = useAuth();
  const router = useRouter();
  const isLiked = true;
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
            imgFeed.map((image) => (
              <ImgCard key={image?.id} imageInfo={image} isLiked={isLiked} />
            ))}
          {isFetchingNextPage && (
            <div className="text-xl"> fetching next page</div>
          )}
        </div>
      </div>
    );
}
