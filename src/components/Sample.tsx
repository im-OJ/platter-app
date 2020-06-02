import * as React from "react";
import { Row, Tag, Button, Card, Typography, Input, Progress } from "antd";
import {
  DownloadOutlined,
  CheckOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import Howler from "react-howler";

import { useNewSampleMutation } from "./Upload/hooks";
import { TagInput } from "./TagInput";
import { ipcRenderer } from "electron";

interface Props {
  name: string;
  url: string | undefined;
  username: string;
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
  console.log(props.options, uploadDone);
  const play = () => {
    // @ts-ignore
    // window.Howler.stop();
    // @ts-ignore

    if (props.url) {
      console.log("playing", props.url);
      setPlaying(true);
    } else {
      console.error("no url");
    }
  };

  const pause = () => {
    setPlaying(false);
  };
  pause;

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
          html5
          src={props.url}
          playing={playing}
          preload
          onPlay={() => {
            console.log("playing sample");
          }}
          onStop={() => {
            setPlaying(false);
          }}
          onEnd={() => {
            setPlaying(false);
          }}
        />
      )}
      <Card
        bodyStyle={{ padding: 2 }}
        style={{
          padding: 2,
          width: "100%",

          maxHeight: 45,
          overflow: "hidden",
        }}
      >
        <Row
          style={{
            display: "flex",
          }}
        >
          <Col size={1}>
            {playing ? (
              <Button
                type="default"
                shape="circle"
                size="small"
                icon={<PauseOutlined />}
                onClick={() => {
                  pause();
                }}
              />
            ) : (
              <Button
                type="default"
                shape="circle"
                size="small"
                icon={<CaretRightOutlined size={12} />}
                onClick={() => {
                  play();
                }}
              />
            )}
          </Col>
          <Col size={4}>
            {!editMode ? (
              <Typography.Paragraph
                ellipsis
                style={{ width: "100%", verticalAlign: "middle" }}
              >
                {props.name}
              </Typography.Paragraph>
            ) : (
              <Input
                type="text"
                size="small"
                defaultValue={props.name}
                value={editName}
                onChange={(c) => setEditName(c.target.value)}
              />
            )}
          </Col>
          <Col size={4}>
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
          <Col size={3}>
            <Typography>{props.username}</Typography>
          </Col>
          <Col size={1}>
            {!editMode ? (
              <Button
                type="default"
                size="small"
                shape="circle"
                icon={<DownloadOutlined />}
                onClick={() => {
                  ipcRenderer.send("download-item", { url: props.url });
                }}
              />
            ) : uploadDone ? (
              <Button
                type="default"
                size="small"
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
                strokeWidth={12}
                percent={props.options && props.options.progress}
              />
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export const Col = (props: {
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
        verticalAlign: "middle",
      }}
    >
      {props.children}
    </div>
  );
};
