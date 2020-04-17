import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { useGetSamples } from "./database/hooks";
import { Spin } from "antd";
import { Page } from "./components/Page";

export const Home = () => {
  const samples = useGetSamples();
  if (!samples) {
    return <Spin />;
  }
  console.log("home");
  return (
    <Page>
      <SampleTable samples={samples} />
    </Page>
  );
};
