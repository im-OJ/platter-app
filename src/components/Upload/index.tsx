import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Page } from "../Page";
import { Button } from "antd";

const testQuery = gql`
  query testQ {
    helloWorld
  }
`;

export const Upload = () => {
  const { data, error, refetch } = useQuery(testQuery, {
    fetchPolicy: "network-only",
  });
  if (error) {
    console.log(error);
  }
  return (
    <Page>
      <>
        <p>{data && JSON.stringify(data)}</p>
        <Button onClick={() => refetch()}>Refetch </Button>
      </>
    </Page>
  );
};
