import * as React from "react";
import { Sample } from "./Sample";
import { gql, useQuery } from "@apollo/client";
import { Query, QuerySearchSamplesArgs, Sample as SampleType } from "@/generated/graphql";

interface Props {
  tags?: Array<string> | undefined;
  samples?: Array<SampleType>;
}

const sampleQuery = gql`
  query SampleTableSearch($tags: [String!]) {
    searchSamples(tags: $tags) {
      name
      tagLink {
        name
      }
      user {
        name
        id
      }
      url
    }
  }
`;

export const SampleTable = (props: Props) => {
  console.log("new props", props.tags);

  const { data, error } = useQuery<Query, QuerySearchSamplesArgs>(sampleQuery, {
    variables: {
      tags: props.tags,
    },
    skip: !props.tags,
  });

  if (error) {
    console.log(error);
  }

  const samples = data ? data.searchSamples : props.samples
  return (
    <>
      {samples &&
        samples.map((sample) => {
          if (!sample.name || !sample.tagLink || !sample.url) {
            return null;
          }
          return (
            <Sample
              name={sample.name}
              tags={sample.tagLink.map((tl) => tl?.name ?? "")}
              url={sample.url}
              username={sample.user.name ?? "no name"}
            />
          );
        })}
    </>
  );
};
