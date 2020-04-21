import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { useGetSamples } from "./database/database";
import { Spin } from "antd";
import { Page } from "./components/Page";
import { useEffect } from "react";

export const Home = () => {
  const { data } = useGetSamples();

  return (
    <Page>
      <SampleTable samples={data} />
    </Page>
  );
};
