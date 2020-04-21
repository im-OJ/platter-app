import { config } from "../config";
import { Sample } from "../generated/graphql";
import PouchDB from "pouchdb-browser";
import _ from "lodash";
import { useState } from "react";

const database = {
  samples: {
    remote: new PouchDB(config.dbUrl + "samples"),
    local: new PouchDB("samples"),
  },
};

export const getSampleById = (id: string): Promise<Sample> => {
  return database.samples.local.get(id);
};

// TODO: This currently doesnt seem to work ??
export const reSyncDBs = async () => {
  console.log("enabling sync ");
  database.samples.local.replicate
    .from(database.samples.remote, {
      live: true,
      retry: true,
    })
    .then(() => {
      console.log("Sync complete");
    })
    .catch(console.error);
};
export const useGetSamples = (): { data: Array<Sample> | null } => {
  const [data, setData] = useState<any>(null);
  console.log("refreshing samples");
  const readSamples = (locale: "remote" | "local") => {
    database.samples[locale]
      .allDocs({ include_docs: true })
      .then((all) => {
        const samples: Array<any> = [];
        all.rows.map((s) => {
          const sample = s.doc;
          samples.push(sample);
        });
        setData(samples);
      })
      .catch(console.error);
  };
  if (!data) {
    readSamples("remote");
  }
  database.samples.remote
    .changes({
      since: "now",
    })
    .on("change", () => {
      console.log("change in remote");
      readSamples("remote");
    });

  return { data };
};
