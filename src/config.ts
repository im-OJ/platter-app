export const isDev = require("electron-is-dev");

export const config = {
  isDev,
  dbUrl: !isDev
    ? "https://platter-db.herokuapp.com/"
    : "https://platter-db-dev.herokuapp.com/",
  apiUrl: !isDev
    ? "https://platter-api.herokuapp.com/graphql"
    : "https://platter-api-dev.herokuapp.com/graphql",
};
