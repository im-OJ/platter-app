import { Sample } from "../generated/graphql";
import { useState } from "react";
import { getSamples } from "./database";

export const useGetSamples = () => {
  const [data, setData] = useState<Array<Sample> | null>(null);

  getSamples().then((samples) => {
    setData(samples);
  });

  return data;
};
