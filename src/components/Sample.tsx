import * as React from "react";
import { Row, Tag, Button, Card, Typography, Input } from "antd";
import {
  DownloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Howler from "react-howler";

import { TagInput } from "./TagInput";
import { useNavigateTo } from '../navigation';
import { downloadItem, dragSample } from "../helpers/remote";
import { useSetting } from "../helpers/settings";

interface Props {
  name: string;
  url: string | undefined;
  username: string;
  userId: string;
  filetype: string;
  tags?: Array<string>;
  onTagClick?: (tag: string) => void;
  options?: {
    initalUpload: boolean;
  };
  setError?: (err: string) => void;
}

export const Sample = (props: Props) => {
  const [editMode, setEditMode] = useState(
    props.options?.initalUpload ?? false
  );
  setEditMode
  const [playing, setPlaying] = useState(false);
  const [editName, setEditName] = useState(props.name);
  const [editTags, setEditTags] = useState<Array<string>>();
  const [downloadPath] = useSetting("downloadFolder")
  const tags = editTags ? editTags : props.tags;
  
  const navigateTo = useNavigateTo()
  const play = () => {
    setPlaying(true)
  }
  const pause = () => {
    setPlaying(false);
  };
  pause;

  
  return (
    <>
      {props.url && props.url.length > 4 && (
        <Howler
          html5
          src={props.url}
          playing={playing}
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
        draggable
          onDragStart={() => {
            console.log("dragging");
            if(props.url){
              dragSample({name: props.name, url: props.url});
            }
          }}
          onClick={() => play()}
      
      >
        <Row
          color={"#00ff00"}
          style={{
            display: "flex",
          }}
        >
          <Col size={4}>
            {!editMode ? (
              <Typography
                style={{ width: "100%", verticalAlign: "middle" }}
              >
                {props.name}
              </Typography>
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
          <Col size={1}>
              <Typography
                style={{ width: "100%", verticalAlign: "middle" }}
              >
                {props.filetype}
              </Typography>
          </Col>
          <Col size={4}>
            <div
            onClick={e => {
              e.stopPropagation()
            }}>
            
            {!editMode ? (
              tags ? (
                tags.map((t) => {
                  return <Tag onClick={() => {
                    props.onTagClick && props.onTagClick(t)
                  }}>{t}</Tag>;
                })
              ) : null
            ) : (
              <TagInput
                tags={editTags}
                onTagsChange={(tags) => {
                  if (tags) {
                    setEditTags(tags);
                  }
                }}
              />
            )}
            </div>
          </Col>
          <Col size={3}>
           <div
            onClick={(e) => {
              e.stopPropagation()
              navigateTo("profile", {
                id: props.userId
              })}}
            
           > <Button type={"link"}>{props.username}</Button> </div>
          </Col>
          <Col size={1}>
            {!editMode ? (
              <Button
                type="default"
                size="small"
                shape="circle"
                icon={<DownloadOutlined />}
                onClick={(e) => {
                  e.stopPropagation()
                  if(props.url){
                    downloadItem({ url: props.url ?? "", path: downloadPath as string, name: props.name + "." + props.filetype })
                  }else{
                    console.error("Tried to download sample with no URL")
                  }
                }}
              />
            ) : null}
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
