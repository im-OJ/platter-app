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

export const reSyncDBs = async () => {
  console.log("syncing ");
  const db = database.samples.remote;
  // await db
  //   .allDocs()
  //   .then(function (result) {
  //     // Promise isn't supported by all browsers; you may want to use bluebird
  //     return Promise.all(
  //       result.rows.map(function (row) {
  //         return db.remove(row.id, row.value.rev);
  //       })
  //     );
  //   })
  //   .then(function () {
  //     return true;
  //   })
  //   .catch(function (err: any) {
  //     console.error(err);
  //     return false;
  //   });

  database.samples.local.replicate
    .from(database.samples.remote, {
      live: true,
    })
    .then(() => {
      console.log("Sync complete");
    })
    .catch(console.error);
};
export const useGetSamples = (): { data: Array<Sample> | null } => {
  const [data, setData] = useState<any>(null);
  console.log("refreshing samples");
  const readSamples = (local: "remote" | "local") => {
    database.samples[local]
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
  if (data) {
    database.samples.remote
      .changes({
        since: "now",
      })
      .on("change", () => {
        console.log("change in remote");
        readSamples("remote");
      })
      .on("error", console.log);
  } else {
    readSamples("remote");
  }

  return { data };
};
