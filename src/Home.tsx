import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { Page } from "./components/Page";
import { Tag, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Grid from "antd/lib/card/Grid";

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

export const TagInput = (props: {
  addTags: Array<string> | undefined;
  onTagsChange: (tags: Array<string> | undefined) => void;
}) => {
  const [tags, setTags] = useState<Array<string> | undefined>(
    props.addTags ?? undefined
  );

  const NewTag = () => {
    const [value, setValue] = useState<string | undefined>();
    const [isInput, setIsInput] = useState(false);
    useEffect(() => {
      props.onTagsChange(tags);
    }, [tags]);

    return !isInput ? (
      <Tag
        className="site-tag-plus"
        onClick={() => {
          setIsInput(true);
        }}
      >
        <PlusOutlined /> New Tag
      </Tag>
    ) : (
      <Input
        type="text"
        size="small"
        style={{
          width: 64,
        }}
        onChange={(c) => {
          setValue(c.target.value);
        }}
        value={value}
        onPressEnter={() => {
          if (!value) {
            return;
          }

          setTags(tags ? [...tags, value] : [value]);
          setIsInput(false);
        }}
        placeholder="New Tag"
      />
    );
  };
  return (
    <div style={{ width: "100%", backgroundColor: "#EEEEEE" }}>
      {tags &&
        tags.map((t) => {
          return (
            <Tag
              closable
              onClose={() => {
                setTags(tags.filter((tag) => tag !== t));
              }}
            >
              {t}
            </Tag>
          );
        })}
      <NewTag />
    </div>
  );
};
