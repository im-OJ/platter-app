import * as React from "react";
import { Page } from "../Page";
import { gql, useQuery } from "@apollo/client";
import { PageHeader, Row } from "antd";
import { Query } from "../../generated/graphql";
import { SampleTable } from "../SampleTable";

const myProfile = gql`
  query MyProfile {
    me {
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

export const Profile = () => {
  const { data } = useQuery<Query>(myProfile);
  if (!data || !data.me) {
    return null;
  }
  return (
    <Page>
      <>
        <Row><PageHeader title={data.me.username ?? "No username"} subTitle={(data.me.samples?.length ?? "no") + " samples."}/></Row>
        <Row><br/>
       {data.me.samples &&  <SampleTable 
          samples={data.me.samples}
        />}
        </Row>
        
      </>
    </Page>
  );
};
