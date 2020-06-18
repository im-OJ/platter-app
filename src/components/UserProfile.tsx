import * as React from "react"
import { gql, useQuery } from '@apollo/client';
import { QueryGetUserArgs, Query } from '../generated/graphql';
import { PageHeader, Row } from "antd";
import { SampleTable } from "./SampleTable";
import { Page } from "./Page";

const userQuery = gql`
  query UserQuery($id: String!) {
    getUser(id: $id) {
      id
      username
      samples {
        id
        name
        tagLink {
          name
        }
        downloads
        user {
          id
          name
        }
        url
      }
    }
  }
`;

export type UserProfileProps = {
  id: string
}

export const UserProfile = (props: UserProfileProps) => {
  const { data } = useQuery<Query, QueryGetUserArgs>(userQuery, {
    variables: {
      id: props.id
    },
  });

  if (!data || !data.getUser) {
    return null;
  }
  return (
    <Page>
      <>
        <Row><PageHeader title={data.getUser.username ?? "No username"} subTitle={(data.getUser.samples?.length ?? "no") + " samples."}/></Row>
        <Row><br/>
       {data.getUser.samples &&  <SampleTable 
          samples={data.getUser.samples}
        />}
        </Row>
      </>
    </Page>
  );
}