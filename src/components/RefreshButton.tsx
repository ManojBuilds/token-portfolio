import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import Cached from "../assets/cached.png";
import { refreshWatchlist } from "../lib/api";
import { refreshPrices } from "../store/slices/watchlistSlice";
import type { RootState } from "../store/rootReducer";
import { useMutation } from "@tanstack/react-query";

export const RefreshButton = () => {
  const dispatch = useDispatch();
  const { items: watchlistItems } = useSelector(
    (state: RootState) => state.watchlist,
  );

  const refreshPricesMutation = useMutation({
    mutationFn: async () => {
      if (watchlistItems.length === 0) return;
      const coinIds = watchlistItems.map((item) => item.id);
      const { coins } = await refreshWatchlist(coinIds);
      dispatch(refreshPrices(coins));
    },
  });

  return (
    <Button
      variant={"secondary"}
      icon={
        <img
          src={Cached}
          alt="refresh"
          className={refreshPricesMutation.isPending ? "animate-spin" : ""}
        />
      }
      className="items-center justify-center"
      onClick={() => refreshPricesMutation.mutate()}
      disabled={refreshPricesMutation.isPending}
    >
      <span className="hidden sm:inline-flex">
        {refreshPricesMutation.isPending ? "Refreshing..." : "Refresh Prices"}
      </span>
    </Button>
  );
};
