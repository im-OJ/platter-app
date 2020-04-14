import { config } from "../config";
import { Sample } from "../generated/graphql";
import PouchDB from "pouchdb-browser";
import _ from "lodash";

const database = {
  samples: new PouchDB(config.dbUrl + "samples"),
};

export const getSampleById = (id: string): Promise<Sample> => {
  return database.samples.get(id);
};

export const getSamples = async (): Promise<Array<Sample>> => {
  console.log("getting sample docs", config.dbUrl + "samples");
  const all = await database.samples.allDocs({ include_docs: true });
  const samples: Array<any> = [];
  console.log("got all: " + JSON.stringify(all, null, 1));
  all.rows.map((s) => {
    const sample = s.doc;
    samples.push(sample);
  });

  return samples;
};
