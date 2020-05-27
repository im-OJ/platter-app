import * as React from "react";
import { Row, Tag, Button, Card, Typography, Input, Progress } from "antd";
import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";

import { useState } from "react";
import Howler from "react-howler";

import { useNewSampleMutation } from "./Upload/hooks";
import { TagInput } from "./TagInput";

interface Props {
  name: string;
  url: string | undefined;
  tags?: Array<string>;
  options?: {
    progress?: number;
    initalUpload: boolean;
  };
  setError?: (err: string) => void;
}

export const Sample = (props: Props) => {
  const [editMode, setEditMode] = useState(
    props.options?.initalUpload ?? false
  );
  const [playing, setPlaying] = useState(false);
  const [editName, setEditName] = useState(props.name);
  const [editTags, setEditTags] = useState<Array<string>>();
  const [submit, { data, error }] = useNewSampleMutation();

  const tags = editTags ? editTags : props.tags;

  data;
  if (error) {
    props.setError && props.setError(error.message);
  }
  const uploadDone =
    props.options && props.options.progress == 100 && props.url;

  const play = () => {
    //@ts-ignore
    // window.Howler.stop();
    if (props.url) {
      console.log("playing", props.url);
      setPlaying(true);
    } else {
      console.error("no url");
    }
  };
  setEditMode;
  const submitSample = () => {
    console.log("submitting", {
      name: editName,
      url: props.url,
      tagText: editTags,
    });
    if (!props.url) {
      console.error("tried to submit with no URL");
      return;
    }
    submit({
      variables: {
        sample: {
          name: editName,
          url: props.url,
          tagText: editTags,
        },
      },
    })
      .then(() => setEditMode(false))
      .catch(console.error);
  };

  return (
    <>
      {props.url && props.url.length > 4 && (
        <Howler
          src={props.url}
          playing={playing}
          preload
          onPlay={() => {
            console.log("playing sample");
          }}
          onEnd={() => {
            setPlaying(false);
          }}
        />
      )}
      <Card
        bodyStyle={{ padding: 2 }}
        style={{
          padding: 4,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Row
          onClick={() => {
            console.log("sample clicked");
            play();
          }}
          style={{
            display: "flex",
          }}
        >
          <Col size={5}>
            {!editMode ? (
              <Typography style={{ width: "100%" }}>{props.name}</Typography>
            ) : (
              <Input
                type="text"
                size="small"
                defaultValue={props.name}
                value={editName}
                onChange={(c) => setEditName(c.target.value)}
              ></Input>
            )}
          </Col>
          <Col size={6}>
            {!editMode ? (
              tags ? (
                tags.map((t) => {
                  return <Tag>{t}</Tag>;
                })
              ) : null
            ) : (
              <TagInput
                addTags={undefined}
                onTagsChange={(tags) => {
                  if (tags) {
                    setEditTags(tags);
                  }
                }}
              />
            )}
          </Col>
          <Col size={1}>
            {!editMode ? (
              <a
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button
                  type="default"
                  shape="circle"
                  icon={<DownloadOutlined />}
                />
              </a>
            ) : uploadDone ? (
              <Button
                type="default"
                shape="circle"
                icon={<CheckOutlined />}
                onClick={() => {
                  submitSample();
                }}
              />
            ) : (
              <Progress
                type="circle"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                width={32}
                strokeWidth={14}
                percent={props.options && props.options.progress}
              />
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};

const Col = (props: {
  size: number;
  children: JSX.Element | JSX.Element[] | null;
}) => {
  return (
    <div
      style={{
        flex: props.size,
        textAlign: "left",
        overflow: "hidden",
        margin: "auto",
        marginLeft: 4,
        marginRight: 4,
      }}
    >
      {props.children}
    </div>
  );
};
