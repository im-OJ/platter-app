const isProd = !require("electron-is-dev");
const useLocalApi = true;

export const config = {
  isProd,
  dbUrl: isProd
    ? "https://platter-db.herokuapp.com/"
    : "https://platter-db-dev.herokuapp.com/",
  apiUrl: useLocalApi
    ? "http://localhost:3001/graphql"
    : isProd
    ? "https://platter-api.herokuapp.com/graphql"
    : "https://platter-api-dev.herokuapp.com/graphql",
};
