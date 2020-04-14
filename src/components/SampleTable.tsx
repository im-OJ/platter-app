import * as React from "react";
import { useGetSamples } from "../database/hooks";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Sample } from "@/generated/graphql";

// export type Sample = {
//     __typename?: 'Sample';
//    _id: Scalars['String'];
//    name: Scalars['String'];
//    user_id: Scalars['String'];
//    url?: Maybe<Scalars['String']>;
//    tags?: Maybe<Array<Scalars['String']>>;
//  };

export const SampleTable = (props: { samples: Array<Sample> }) => {
  const samples = props.samples;

  if (!samples || samples.length < 1) {
    console.log("no samples");
    return null;
  }
  console.log(samples);
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
          return text + ", ";
          // next.map((t: string) => t + ", ");
        }),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={samples} />
    </>
  );
};
