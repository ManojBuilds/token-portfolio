import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Star from "../assets/star.png";
import { RefreshButton } from "./RefreshButton";
import TokenListTable from "./watchlist/data-table";
import { AddTokenModal } from "./AddTokenModal";
import { useState } from "react";
import { Button } from "./ui/button";
import Plus from "../assets/plus-mini.png";
import { getTrendingTokens } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../store/rootReducer";

export const Watchlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const watchlistItems = useSelector(
    (state: RootState) => state.watchlist.items,
  );
  const { data } = useQuery({
    queryKey: ["trendingTokens"],
    queryFn: getTrendingTokens,
  });

  return (
    <MaxWidthWrapper className="max-w-[1384px] mt-12 sm:p-7">
      <section>
        <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
          <div className="flex items-center gap-1">
            <img src={Star} alt="Star" className="w-full h-full" />
            <h4 className="font-medium text-2xl text-secondary-foreground leading-[125%] tracking-[-0.96%]">
              Watchlist
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <RefreshButton />
            <Button
              onClick={() => setIsModalOpen(true)}
              variant={"primary"}
              icon={<img src={Plus} alt="Add Token" />}
            >
              Add Token
            </Button>
          </div>
        </div>
        <div className="pl-4 sm:pl-0">
          <TokenListTable tokens={watchlistItems} />
        </div>
      </section>
      <AddTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data?.coins || []}
      />
    </MaxWidthWrapper>
  );
};
