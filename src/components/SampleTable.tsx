import * as React from "react";
import { Sample } from "./Sample";
import { gql, useQuery } from "@apollo/client";
import { Query, QuerySearchSamplesArgs } from "@/generated/graphql";

interface Props {
  tags: Array<string>;
}

const sampleQuery = gql`
  query SampleTableSearch($tags: [String!]) {
    searchSamples(tags: $tags) {
      name
      tagLink {
        name
      }
      url
    }
  }
`;

export const SampleTable = (props: Props) => {
  const { data, error } = useQuery<Query, QuerySearchSamplesArgs>(sampleQuery, {
    variables: {
      tags: props.tags,
    },
  });

  if (error) {
    console.log(error);
  }
  return (
    <>
      {data &&
        data.searchSamples?.map((sample) => {
          if (!sample.name || !sample.tagLink || !sample.url) {
            return null;
          }
          return (
            <Sample
              name={sample.name}
              tags={sample.tagLink.map((tl) => tl?.name ?? "")}
              url={sample.url}
            />
          );
        })}
    </>
  );
};
