import PouchDB from "pouchdb";
interface DbSample {
  _id: string;
  name: string;
  url?: string;
  user_id: string;
  tags: string[];
}

const database = {
  samples: new PouchDB("https://platter-db-dev.herokuapp.com/samples"),
};

export const getSampleById = (id: string): Promise<any> => {
  return database.samples.get(id);
};
