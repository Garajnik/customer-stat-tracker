import { BarChart } from "@mui/x-charts/BarChart";

interface ChartProps {
  intervals: number[];
  label: string;
}

export default function SimpleChart({ intervals, label }: ChartProps) {
  const bars: string[] = [];
  intervals.forEach(function (value) {
    bars.push((bars.length + 1).toString() + `, ${value}`);
  });
  return (
    <div>
      <BarChart
        xAxis={[
          {
            label: label,
            id: "barCategories",
            data: bars,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: intervals,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}
