import { useCallback, useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

import { France } from "../components/WeatherMap/France";
import { Switzerland } from "../components/WeatherMap/Switzerland";

import type { WeatherData } from "./WeatherData";
import { WeatherMap } from "./WeatherMap";

interface StoryProps {
  url: string;
}

export const Story = ({ url }: StoryProps) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const resp = await fetch(staticFile(url));
    const json = await resp.json();
    setData(json);
    continueRender(handle);
  }, [handle, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <WeatherMap type={data.days[0].icon} temperature={data.days[0].temp}>
      {data.country === "france" && <France />}
      {data.country === "switzerland" && <Switzerland />}
    </WeatherMap>
  );
};
