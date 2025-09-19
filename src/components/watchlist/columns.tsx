import More from "../../assets/ellipsis-horizontal.png";
import Pencil from "../../assets/pencil-square.png";
import { createColumnHelper } from "@tanstack/react-table";
import { formatChange, formatHoldings, formatPrice } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import type { Token } from "../../types";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { HoldingsEditor } from "./HoldingsEditor";
import { Remove } from "./RemoveToken";

const columnHelper = createColumnHelper<Token>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Token",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded border border-[rgba(255,255,255,0.1)] overflow-hidden">
          <img
            src={info.row.original.thumb}
            alt={info.getValue()}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-normal text-[13px] flex gap-1">
          <div className="text-secondary-foreground font-medium">
            {info.getValue()}
          </div>
          <div className="text-border">({info.row.original.symbol})</div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <div className="text-[13px] font-normal text-border">
        {formatPrice(info.getValue())}
      </div>
    ),
  }),
  columnHelper.accessor("price_change_percentage_24h", {
    header: "24h %",
    cell: (info) => (
      <div className="text-[13px] font-normal text-border">
        <span>{formatChange(info.getValue())}</span>
      </div>
    ),
  }),
  columnHelper.accessor("sparkline_in_7d", {
    header: "Sparkline (7d)",
    cell: (info) => {
      const { price_change_percentage_24h } = info.row.original;
      return (
        <Sparklines data={info.getValue()}>
          <SparklinesLine
            color={price_change_percentage_24h > 0 ? "#32CA5B" : "#FF3A33"}
          />
        </Sparklines>
      );
    },
  }),
  columnHelper.accessor("holdings", {
    header: "Holdings",
    cell: (info) => {
      const isEditing = info.table.options.meta?.editingRowId === info.row.id;

      return isEditing ? (
        <HoldingsEditor info={info} />
      ) : (
        <div className="text-[13px] font-normal  text-secondary-foreground">
          {formatHoldings(info.getValue())}
        </div>
      );
    },
  }),
  columnHelper.accessor("value", {
    header: "Value",
    cell: (info) => {
      const { price, holdings } = info.row.original;
      const value = price * holdings;
      return (
        <div className="text-[13px] font-normal  text-secondary-foreground">
          {formatPrice(value)}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row, table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-[15px] h-[15px] aspect-square">
            <img src={More} alt="more" className="w-full h-full" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-0">
          <div className="px-4 pt-4">
            <DropdownMenuItem
              onClick={() => table.options.meta?.setEditingRowId(row.id)}
              className="px-2 py-1 rounded flex items-center gap-2 bg-secondary hover:bg-white/10"
            >
              <img
                src={Pencil}
                alt="Edit"
                className="w-[15px] h-[15px] aspect-square"
              />
              <span className="text-[13px] font-medium text-border">
                Edit Holdings
              </span>
            </DropdownMenuItem>
          </div>
          <Separator className="bg-secondary mt-1" />
          <Separator className="bg-[rgba(255,255,255,0.08)] mb-1" />
          <Remove id={row.original.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];
