import * as React from "react";
import { Sample } from "@/generated/graphql";
import { Row, Col, Input, Progress, Button } from "antd";
import { TagInput } from "./TagInput";
import { useState, useEffect } from "react";
import Form from "antd/lib/form/Form";
import { useNewSampleMutation } from "@/Interaction/firebase-storage";

type EditSampleProps = {
  sample: Partial<Sample>;
  onSampleUpdate: (s: Partial<Sample>) => void;
  uploadProgress?: number;
};
export const EditSample = (props: EditSampleProps) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [name, setName] = useState<string>();
  const [submit, { data }] = useNewSampleMutation();

  useEffect(() => {
    props.onSampleUpdate({
      ...props.sample,
      name,
    });
  }, [tags, name]);
  const onSubmit = () => {
    submit({
      variables: {
        sample: {
          name,
          url,
        },
      },
    });
  };
  return (
    <div style={{ flex: 1 }}>
      <Row style={{ flex: 1 }}>
        <Col span={10}>
          <Input
            placeholder=""
            onChange={(e) => {
              setName(e.target.value);
            }}
            defaultValue={props.sample.name ?? ""}
          />
        </Col>
        <Col span={10}>
          <TagInput
            onTags={(tags) => {
              setTags(tags);
            }}
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              onSubmit();
            }}
            style={{
              width: "100%",
            }}
          >
            Sign Up
          </Button>
        </Col>
      </Row>
      <Row style={{ paddingBottom: 4 }}>
        <Progress size="small" percent={props.uploadProgress ?? 0} />
      </Row>
    </div>
  );
};
