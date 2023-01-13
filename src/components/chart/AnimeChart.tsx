import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { IChartDataType } from "../utilities/types";

import AnimeTooltip from "./AnimeTooltip";

export default function AnimeChart() {
  const { data } = useQuery(["animes"], () => axios.get(`https://api.jikan.moe/v4/top/anime?limit=20`).then((res) => res.data), {
    staleTime: 30000,
    refetchIntervalInBackground: true,
  });
  const chartData = useMemo(() => {
    let chartData: IChartDataType[] = [];

    for (let i = 0; i < data?.data?.length; i++) {
      if (data.data[i].year && chartData.filter((item: any) => item.year === data.data[i].year).length === 0)
        chartData.push({
          year: data.data[i].year,
          value: 1,
          animeList: [data.data[i].title_english],
        });
      else {
        for (let j = 0; j < chartData.length; j++) {
          chartData[j].year === data.data[i].year && chartData[j].value++ && chartData[j].animeList.push(data.data[i].title_english);
        }
      }
    }
    chartData.sort((x: IChartDataType, y: IChartDataType) => {
      return x.year - y.year;
    });

    return chartData;
  }, [data?.data]);

  return (
    <ResponsiveContainer width="95%" aspect={2.5}>
      <AreaChart
        data={chartData}
        margin={{
          top: 50,
        }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7eeba5" />
            <stop offset="40%" stopColor="#7eeba5" stopOpacity={0.5} />
            <stop offset="55%" stopColor="#8884d8" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#8884d8" />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis dataKey="year" />
        <YAxis dataKey="value" />
        <Tooltip wrapperStyle={{ border: "none", outline: "none" }} content={<AnimeTooltip />} />
        <Area type="monotone" dataKey="value" stroke="url(#color)" fill="url(#color)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
