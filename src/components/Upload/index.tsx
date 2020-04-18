import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Page } from "../Page";

const testQuery = gql`
  query testQ {
    helloWorld
  }
`;

export const Upload = () => {
  const { data, error } = useQuery(testQuery);
  console.log(data, error);
  return (
    <Page>
      <p>{data && JSON.stringify(data)}</p>
    </Page>
  );
};
