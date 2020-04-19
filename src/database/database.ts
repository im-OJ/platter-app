import { config } from "../config";
import { Sample } from "../generated/graphql";
import PouchDB from "pouchdb-browser";
import _ from "lodash";

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
  const db = database.samples.local;
  await db
    .allDocs()
    .then(function (result) {
      // Promise isn't supported by all browsers; you may want to use bluebird
      return Promise.all(
        result.rows.map(function (row) {
          return db.remove(row.id, row.value.rev);
        })
      );
    })
    .then(function () {
      return true;
    })
    .catch(function (err: any) {
      console.error(err);
      return false;
    });
  database.samples.local.removeAllListeners();
  database.samples.remote.removeAllListeners();
  database.samples.local.replicate
    .from(database.samples.remote)
    .then(() => {
      console.log("Sync complete");
    })
    .catch(console.error);
};
export const getSamples = async (): Promise<Array<Sample>> => {
  reSyncDBs();
  const all = await database.samples.local.allDocs({ include_docs: true });
  const samples: Array<any> = [];
  all.rows.map((s) => {
    const sample = s.doc;
    samples.push(sample);
  });

  return samples;
};
