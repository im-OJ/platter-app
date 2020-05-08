import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Query } from "@/generated/graphql";
import { Button } from "antd";
import { Page } from "../Page";

const testQuery = gql`
  query testPageQuery {
    hello
  }
`;

const Test = () => {
  const { data, refetch, error } = useQuery<Query>(testQuery);

  if (error || !data) {
    return null;
  }

  return (
    <Page>
      <>
        <Button
          title="Retry"
          onClick={() => {
            refetch();
          }}
        >
          Retry
        </Button>
        <br />
        {JSON.stringify(data)}
        <br />
      </>
    </Page>
  );
};

export default Test;
