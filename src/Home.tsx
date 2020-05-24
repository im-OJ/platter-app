import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { Page } from "./components/Page";

export const Home = () => {
  return (
    <Page>
      <>
        <SampleTable tags={["a"]} />
      </>
    </Page>
  );
};
