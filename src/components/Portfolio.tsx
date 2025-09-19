import { useSelector } from "react-redux";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { PortfolioPieChart } from "./PieChart";
import { formatPrice, formatTimestamp } from "../lib/utils";
import { useMemo } from "react";
import type { RootState } from "../store/rootReducer";
import { portfolioTotal } from "../store/slices/watchlistSlice";

const COLORS = [
  "#18C9DD",
  "#FB923C",
  "#A78BFA",
  "#10B981",
  "#FB7185",
  "#60A5FA",
];

export const Portfolio = () => {
  const total = useSelector(portfolioTotal);
  const { lastRefreshed, items } = useSelector(
    (state: RootState) => state.watchlist,
  );

  const pieChartData = useMemo(() => {
    if (total === 0) return [];

    const sortedItems = [...items].sort(
      (a, b) => b.price * b.holdings - a.price * a.holdings,
    );

    const top5 = sortedItems.slice(0, 5);
    const others = sortedItems.slice(5);

    const data = top5.map((item, index) => ({
      name: `${item.name} (${item.symbol.toUpperCase()})`,
      value: parseFloat(
        (((item.price * item.holdings) / total) * 100).toFixed(2),
      ),
      color: COLORS[index % COLORS.length],
    }));

    if (others.length > 0) {
      const othersValue = others.reduce(
        (acc, item) => acc + item.price * item.holdings,
        0,
      );
      data.push({
        name: "Others",
        value: parseFloat(((othersValue / total) * 100).toFixed(2)),
        color: COLORS[5] || "#E5E7EB",
      });
    }

    return data;
  }, [items, total]);

  return (
    <MaxWidthWrapper className="pt-4 lg:p-7 max-w-[1384px]">
      <section className="p-6 sm:mt-7 bg-secondary sm:p-7 sm:rounded-xl sm:h-[288px]">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-[19px]">
          <div className="flex flex-col h-full gap-5 sm:gap-0">
            <p className="font-medium text-base">Portfolio Total</p>
            <h2 className="sm:mt-5 text-[40px] sm:text-[56px] font-medium text-secondary-foreground leading-[110%]">
              {formatPrice(total)}
            </h2>
            <p className="mt-auto text-xs">
              Last updated:{" "}
              {formatTimestamp(lastRefreshed ?? new Date().toString())}
            </p>
          </div>
          <div>
            <p className="font-medium text-base">Portfolio Total</p>
            <div className="flex flex-col sm:flex-row gap-5 mt-5">
              <div className="h-[236px] mx-auto sm:h-[160px] aspect-square">
                <PortfolioPieChart data={pieChartData} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  {pieChartData.map((token, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: token.color }}
                        ></div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: token.color }}
                        >
                          {token.name}
                        </p>
                      </div>
                      <p className="text-sm font-medium">{token.value}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};
