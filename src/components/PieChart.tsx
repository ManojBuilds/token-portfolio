import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Props {
  data: { name: string; value: number; color: string }[];
}

export const PortfolioPieChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          paddingAngle={1}
          dataKey="value"
          stroke="#ffffff"
          strokeWidth={1}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke="#ffffff"
              strokeWidth={1}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
