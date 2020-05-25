import * as React from "react";
import { Row, Tag, Button, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface Props {
  name: string;
  url: string;
  tags: Array<string>;
  playUrl: (url: string) => void;
}

export const Sample = (props: Props) => {
  const play = () => {
    props.playUrl(props.url);
  };
  return (
    <Card>
      <Row
        onClick={() => {
          console.log("sample clicked");
          play();
        }}
      >
        {props.name}
        {props.tags.map((t) => {
          return <Tag>{t}</Tag>;
        })}

        <a href={props.url} target="_blank" rel="noopener noreferrer" download>
          <Button type="default" shape="circle" icon={<DownloadOutlined />} />
        </a>
      </Row>
    </Card>
  );
};
