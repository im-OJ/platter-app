import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { Page } from "./components/Page";
import { Row } from "antd";

import { useState } from "react";
import Grid from "antd/lib/card/Grid";
import { TagInput } from "./components/TagInput";

export const Home = () => {
  const [tags, setTags] = useState<Array<string>>();
  return (
    <Page>
      <Grid style={{ width: "100%" }}>
        <Row style={{ textAlign: "left" }}>
          <TagInput
            addTags={tags}
            onTagsChange={(tags) => {
              console.log("tags changed", tags);
              setTags(tags);
            }}
          />
        </Row>

        <Row>
          <SampleTable tags={tags} />
        </Row>
      </Grid>
    </Page>
  );
};
