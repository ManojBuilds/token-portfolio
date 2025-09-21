export interface Token {
  id: string;
  thumb: string;
  name: string;
  symbol: string;
  price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: number[];
  holdings: number;
  value: number;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    editingRowId: string | null;
    setEditingRowId: (id: string | null) => void;
  }
}
