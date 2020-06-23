import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { Page } from "./components/Page";
import { Row, Skeleton, Typography } from "antd";

import { useState } from "react";
import Grid from "antd/lib/card/Grid";
import { TagInput } from "./components/TagInput";
import { gql, useQuery } from "@apollo/client";
import { Query } from "./generated/graphql";

const homeQuery = gql`
  query Home {
    home {
      text
      samples {
        name
        filetype
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

export const Home = () => {
  const [tags, setTags] = useState<Array<string>>();
  const {data, loading, error} = useQuery<Query>(homeQuery)
  error && console.log(error)
  return (
    <Page>
      <Grid style={{ width: "100%" }}>
      <Row style={{ textAlign: "left" }}>
          <TagInput
            tags={tags}
            onTagsChange={(tags) => {
              setTags(tags);
            }}
          />
        </Row>
      <Row>
        <Typography>{!tags && data ? data.home?.text: null}</Typography>
        </Row>
        <Row>
          {data && !loading ? <SampleTable tags={tags} samples={data?.home?.samples ?? undefined} onTagClick={(t) => {
            console.log("adding tag t")
            tags ? setTags([...tags, t]) : setTags([t])

          }} /> : <Skeleton loading={true}/>}
        </Row>
      </Grid>
    </Page>
  );
};
