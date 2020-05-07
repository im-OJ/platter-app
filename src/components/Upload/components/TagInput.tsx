import * as React from "react";
import { Input } from "antd";
import { useState, useEffect } from "react";

export const TagInput = (props: { onTags: (tags: Array<string>) => void }) => {
  const [tags, setTags] = useState<Array<string>>([]);
  useEffect(() => {
    props.onTags(tags);
  }, [tags]);
  return (
    <Input
      onChange={(e) => {
        const myTags = e.target.value
          .replace(",", " ")
          .replace(/\s\s+/g, " ")
          .split(" ");
        if (myTags) {
          setTags(myTags);
        }
      }}
      placeholder={"tags"}
    />
  );
};
