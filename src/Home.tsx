import * as React from "react";
import { SampleTable } from "./components/SampleTable";
import { Page } from "./components/Page";
import { Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export const Home = () => {
  const [tags, setTags] = useState<Array<string>>();
  return (
    <Page>
      <>
        <div style={{ flexDirection: "row" }}>
          <TagInput
            addTags={tags}
            onTagsChange={(tags) => {
              console.log("tags changed", tags);
              setTags(tags);
            }}
          />
        </div>
        <div>
          <SampleTable tags={tags} />
        </div>
      </>
    </Page>
  );
};

const TagInput = (props: {
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
      />
    );
  };
  return (
    <div style={{ width: "100%" }}>
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
