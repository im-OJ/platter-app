import * as React from "react";
import { Sample } from "@/generated/graphql";
import { Row, Col, Input, Progress } from "antd";
import { TagInput } from "./TagInput";
import { useState, useEffect } from "react";

type EditSampleProps = {
  sample: Partial<Sample>;
  onSampleUpdate: (s: Partial<Sample>) => void;
  uploadProgress?: number;
};
export const EditSample = (props: EditSampleProps) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [name, setName] = useState<string>();

  useEffect(() => {
    props.onSampleUpdate({
      ...props.sample,
      name,
      tags,
    });
  }, [tags, name]);

  return (
    <div style={{ flex: 1 }}>
      <Row style={{ flex: 1 }}>
        <Col span={12}>
          <Input
            placeholder=""
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue={props.sample.name ?? ""}
          />
        </Col>
        <Col span={12}>
          <TagInput
            onTags={(tags) => {
              setTags(tags);
            }}
          />
        </Col>
      </Row>
      <Row style={{ paddingBottom: 4 }}>
        <Progress size="small" percent={props.uploadProgress ?? 0} />
      </Row>
    </div>
  );
};
