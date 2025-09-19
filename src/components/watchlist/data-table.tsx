import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { columns } from "./columns";
import type { Token } from "../../types";
import { useDispatch } from "react-redux";
import { updateHoldings } from "../../store/slices/watchlistSlice";

interface TokenListTableProps {
  tokens?: Token[];
}

const TokenListTable: React.FC<TokenListTableProps> = ({ tokens = [] }) => {
  const dispatch = useDispatch();
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);

  const table = useReactTable({
    data: tokens,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    meta: {
      editingRowId,
      setEditingRowId,
      updateData: (rowIndex: number, columnId: string, value: any) => {
        if (columnId === "holdings") {
          const tokenToUpdate = tokens[rowIndex];
          if (tokenToUpdate) {
            dispatch(
              updateHoldings({
                id: tokenToUpdate.id,
                holdings: value as number,
              }),
            );
          }
        }
      },
    },
  });

  return (
    <div className="rounded-xl overflow-hidden border-[1px] border-[rgba(255,255,255,0.08)]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <div className="pt-3" />
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="pl-7">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <div className="pb-3" />
      </Table>
      <div className="flex items-center justify-between p-4 h-[60px]  border-t border-[rgba(255,255,255,0.08)]">
        <div className="text-[13px] font-medium text-border flex items-center gap-1 px-2 py-1">
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          <span className="text-[#71717A]">—</span>
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            table.getRowModel().rows.length}{" "}
          of {table.getPrePaginationRowModel().rows.length} results
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[13px] font-medium text-border px-2 py-1">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} pages
          </div>
          <button
            className="text-[13px] font-medium text-border px-2 py-1 bg-transparent disabled:text-[#52525B]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-[13px] font-medium text-border px-2 py-1 bg-transparent"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenListTable;
