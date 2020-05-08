import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Query } from "@/generated/graphql";
import { Button } from "antd";
import { Page } from "../Page";
import { useKeytar } from "../../Interaction/keytar";

const testQuery = gql`
  query testPageQuery {
    hello
  }
`;

const Test = () => {
  const { data, refetch, error } = useQuery<Query>(testQuery);
  const { value: token, refresh: refreshToken } = useKeytar("token");
  if (error || !data) {
    console.error(error);
    return null;
  }
  const text = JSON.stringify(data);

  return (
    <Page>
      <>
        <Button
          title="Retry"
          onClick={() => {
            refreshToken();
            refetch();
          }}
        >
          Retry
        </Button>
        {text}
        <br />
        {token}
      </>
    </Page>
  );
};

export default Test;
