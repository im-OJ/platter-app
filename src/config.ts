const isProd = !require("electron-is-dev");
const useLocalDb = true;

export const config = {
  isProd,
  dbUrl: isProdF
    ? "https://platter-db.herokuapp.com/"
    : "https://platter-db-dev.herokuapp.com/",
  apiUrl: useLocalDb
    ? "http://localhost:3001/graphql"
    : isProd
    ? "https://platter-api.herokuapp.com/graphql"
    : "https://platter-api-dev.herokuapp.com/graphql",
};
