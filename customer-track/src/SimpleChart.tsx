import { BarChart } from "@mui/x-charts/BarChart";

interface ChartProps {
  intervals: number[];
}

export default function SimpleChart({ intervals }: ChartProps) {
  const bars: string[] = [];
  intervals.forEach(function (value) {
    bars.push((bars.length + 1).toString() + `, ${value}`);
  });
  return (
    <BarChart
      xAxis={[
        {
          categoryGapRatio: 0,
          id: "barCategories",
          data: bars,
          scaleType: "band",
          barGapRatio: 0,
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
  );
}
