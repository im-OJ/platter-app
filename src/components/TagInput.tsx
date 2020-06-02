import * as React from "react";
import { Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export const TagInput = (props: {
  addTags: Array<string> | undefined;
  onTagsChange: (tags: Array<string> | undefined) => void;
}) => {
  const [tags, setTags] = React.useState<Array<string> | undefined>(
    props.addTags ?? undefined
  );

  const NewTag = () => {
    const [value, setValue] = React.useState<string | undefined>();
    const [isInput, setIsInput] = React.useState(false);
    React.useEffect(() => {
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
        autoFocus
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
          const formattedTag = value.replace(/\W/g, "").replace(" ", "");
          setTags(tags ? [...tags, formattedTag] : [formattedTag]);
          setIsInput(false);
        }}
        placeholder="New Tag"
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
