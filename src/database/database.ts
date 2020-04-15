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

export const reSyncDBs = () => {
  database.samples.local.removeAllListeners();
  database.samples.remote.removeAllListeners();
  database.samples.local.replicate.from(database.samples.remote);
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
