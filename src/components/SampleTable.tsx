import * as React from "react";
import { Sample } from "./Sample";
import { gql, useQuery } from "@apollo/client";
import { Query, QuerySearchSamplesArgs } from "@/generated/graphql";
import { useState } from "react";
import ReactHowler from "react-howler";

interface Props {
  tags: Array<string> | undefined;
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
  console.log("new props", props.tags);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingUrl, setPlayingUrl] = useState("http://sample.com/aa.mp3");
  const playSound = (url: string) => {
    setPlayingUrl(url);
    console.log("play url", playingUrl);
    setIsPlaying(true);
  };

  const { data, error } = useQuery<Query, QuerySearchSamplesArgs>(sampleQuery, {
    variables: {
      tags: props.tags,
    },
    skip: !props.tags,
  });

  if (error) {
    console.log(error);
  }
  return (
    <>
      <ReactHowler
        src={playingUrl}
        playing={isPlaying}
        preload={true}
        onEnd={() => {
          setIsPlaying(false);
        }}
        onPlay={() => {
          console.log("Playing sound");
        }}
      />
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
              playUrl={(url) => playSound(url)}
            />
          );
        })}
    </>
  );
};
