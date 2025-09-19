import { useState } from "react";
import { Separator } from "./ui/separator";
import Star from "../assets/star.png";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";
import type { SearchResult, Token } from "../types";
import { useQuery } from "@tanstack/react-query";
import { searchTokens } from "../lib/api";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { addBulkToWatchlist } from "../store/slices/watchlistSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Token[];
}

export const AddTokenModal = ({ isOpen, onClose, data }: Props) => {
  const dispatch = useDispatch();
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery<SearchResult, Error>({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchTokens(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  const toggleTokenSelection = (token: Token) => {
    setSelectedTokens((prev) => {
      if (prev.some((t) => t.id === token.id)) {
        return prev.filter((t) => t.id !== token.id);
      } else {
        return [...prev, token];
      }
    });
  };

  const addToWishlist = () => {
    dispatch(addBulkToWatchlist(selectedTokens));
    onClose();
  };

  console.log("search", searchResults?.coins?.[0]);
  console.log("trending", data?.[0]);

  const tokensToDisplay = query.length > 0 ? searchResults?.coins : data;

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-400 mt-4">Loading...</p>;
    }

    if (isError) {
      return (
        <p className="text-center text-red-500 mt-4">Error fetching tokens.</p>
      );
    }

    if (query.length > 0 && tokensToDisplay?.length === 0) {
      return (
        <p className="text-center text-gray-400 mt-4">
          No results found for "{query}"
        </p>
      );
    }

    return tokensToDisplay?.map((token) => {
      const isSelectedToken = selectedTokens.some((t) => t.id === token.id);
      return (
        <div
          key={token.id}
          className={cn(
            "px-3 py-2 rounded-md flex items-center justify-between hover:bg-secondary cursor-pointer",
            isSelectedToken && "bg-primary/[0.06]",
          )}
          onClick={() => toggleTokenSelection(token)}
        >
          <div className="flex items-center gap-3">
            <img
              src={token.thumb}
              alt={token.symbol}
              className="w-6 h-6 aspect-square object-contain rounded overflow-hidden"
            />
            <p className="text-sm text-secondary-foreground">
              {token.name} ({token.symbol})
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isSelectedToken && (
              <img src={Star} alt="Star" className="w-[15px] h-[15px] " />
            )}
            <div
              className={cn(
                "w-[15px] h-[15px] rounded-full grid place-items-center border border-border ",
                isSelectedToken && "bg-primary text-black border-0",
              )}
            >
              {isSelectedToken && <Check className="w-2.5 h-2.5" />}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {isOpen && (
        <>
          {/*Overlay*/}
          <div
            className="fixed inset-0 z-50 bg-[#212124]/85"
            onClick={onClose}
          />
          {/*Content*/}
          <div className="rounded-xl bg-[#212124] search-modal-shadow sm:w-[640px] sm:h-[480px] fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex flex-col">
            {/*search*/}
            <input
              className="px-4 py-3 h-[52px] text-sm text-[#71717A] outline-none"
              placeholder="Search tokens (e.g., ETH, SOL)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Separator className="w-full h-px bg-white/10" />
            {/*Search results*/}
            <div className="px-2 overflow-y-auto flex-1">
              <div className="px-2 pt-3 pb-1 h-9">
                <p className="text-[#71717A] text-xs font-medium">
                  {query.length === 0 ? "Trending" : "Search results for"}
                  {query.length > 0 && (
                    <span className="text-secondary-foreground font-medium">
                      {" "}
                      {query}
                    </span>
                  )}
                </p>
              </div>
              {renderContent()}
            </div>
            {/*Bottom*/}
            <div className="h-[56px] border-t border-white/10 px-4 py-3 bg-secondary flex justify-end">
              <Button
                disabled={selectedTokens.length === 0}
                variant={selectedTokens.length === 0 ? "secondary" : "primary"}
                className="h-8"
                onClick={addToWishlist}
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
