import * as React from "react";
import { Sample } from "@/generated/graphql";
import { Row, Col, Input, Progress, Button } from "antd";
import { TagInput } from "./TagInput";
import { useState, useEffect } from "react";
import { useNewSampleMutation } from "../../../Interaction/firebase-storage";

type EditSampleProps = {
  sample: Partial<Sample>;
  onSampleUpdate: (s: Partial<Sample>) => void;
  uploadProgress?: number;
};
export const EditSample = (props: EditSampleProps) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [name, setName] = useState<string | undefined>(
    props.sample.name ?? undefined
  );

  const [submit, { data, error }] = useNewSampleMutation();
  if (data) {
    console.log("got data: ", data);
  }
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    props.onSampleUpdate({
      ...props.sample,
      name,
    });
  }, [tags, name]);

  const onSubmit = () => {
    if (!name || !props.sample.url || name.length < 3) {
      console.log("Not filled in, can't submit");
      console.log(name, props.sample.url);
      return;
    }
    console.log("submitting", name, props.sample.url, tags);
    submit({
      variables: {
        sample: {
          name,
          url: props.sample.url,
          tagText: tags,
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
            value={name}
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
            Submit
          </Button>
        </Col>
      </Row>
      <Row style={{ paddingBottom: 4 }}>{props.sample.url}</Row>
      <Row style={{ paddingBottom: 4 }}>
        <Progress size="small" percent={props.uploadProgress ?? 0} />
      </Row>
    </div>
  );
};
