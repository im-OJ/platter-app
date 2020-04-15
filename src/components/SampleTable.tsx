import * as React from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Sample } from "@/generated/graphql";
import styled from "styled-components";

export const SampleTable = (props: { samples: Array<Sample> }) => {
  const samples = props.samples;
  const playAudio = useAudioPlayer();
  if (!samples || samples.length < 1) {
    return null;
  }

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 150,
      render: (tags) =>
        tags.map((text: string, record: any, next: any) => {
          return (
            <TagWrap>
              <Tag>{text}</Tag>
            </TagWrap>
          );
          // next.map((t: string) => t + ", ");
        }),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={samples}
        onRow={(record, rowIndex) => {
          const audio = new Audio(record.url);
          audio.load();
          return {
            style: { cursor: "pointer" },
            onClick: () => {
              playAudio(record.url);
              // console.log("playing");
              // audio.play();
            }, // click row
          };
        }}
      />
    </>
  );
};

const useAudioPlayer = () => {
  return (url: string) => {
    const audio = new Audio(url);
    audio.load();
    audio.play();
  };
};
const TagWrap = styled.span`
  padding: 4;
`;
