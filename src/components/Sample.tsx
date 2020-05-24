import * as React from "react";
import ReactHowler from "react-howler";
import { Row, Tag } from "antd";
import { useState } from "react";

interface Props {
  name: string;
  url: string;
  tags: Array<string>;
}

export const Sample = (props: Props) => {
  const [playSound, setPlaySound] = useState(false);
  const play = () => {
    setPlaySound(true);
  };
  return (
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
      <ReactHowler
        src={props.url}
        playing={playSound}
        onEnd={() => {
          setPlaySound(false);
        }}
        onPlay={() => {
          console.log("Playing sound");
        }}
      />
    </Row>
  );
};
