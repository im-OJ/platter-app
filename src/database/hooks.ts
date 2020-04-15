import { Sample } from "../generated/graphql";
import { useState, useEffect } from "react";
import { getSamples } from "./database";

export const useGetSamples = () => {
  const [data, setData] = useState<Array<Sample> | null>(null);
  useEffect(() => {
    getSamples().then((samples) => {
      setData(samples);
    });
    return;
  }, []);

  return data;
};
