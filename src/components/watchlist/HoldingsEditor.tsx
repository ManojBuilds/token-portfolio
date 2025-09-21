import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHoldings } from "../../store/slices/watchlistSlice";
import { Button } from "../ui/button";
import type { CellContext } from "@tanstack/react-table";
import type { Token } from "../../types";

export const HoldingsEditor = ({
  info,
}: {
  info: CellContext<Token, number>;
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(info.getValue());

  const onSave = () => {
    dispatch(updateHoldings({ id: info.row.original.id, holdings: value }));
    info.table.options.meta?.setEditingRowId(null);
  };

  const onCancel = () => {
    info.table.options.meta?.setEditingRowId(null);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
        className="w-[109px] h-8 rounded-md bg-transparent px-2 edit-holding-shadow text-[#71717A] text-[13px] outline-none"
        autoFocus
        placeholder="Select"
        min={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSave();
          }
          if (e.key === "Escape") {
            onCancel();
          }
        }}
      />
      <Button onClick={onSave} className="h-8">
        Save
      </Button>
    </div>
  );
};
