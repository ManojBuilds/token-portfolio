import { useDispatch } from "react-redux";
import { removeTokenFromWatchlist } from "../../store/slices/watchlistSlice";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import Trash from "../../assets/trash.png";

export const Remove = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const removeWatchlist = () => {
    dispatch(removeTokenFromWatchlist(id));
  };

  return (
    <div className="px-4 pb-4">
      <DropdownMenuItem
        onClick={removeWatchlist}
        className="px-2 py-1 rounded flex items-center gap-2 bg-secondary hover:bg-white/10"
      >
        <img
          src={Trash}
          alt="trash"
          className="w-[15px] h-[15px] aspect-square"
        />
        <span className="text-[#FDA4AF] text-[13px] font-medium ">Remove</span>
      </DropdownMenuItem>
    </div>
  );
};
