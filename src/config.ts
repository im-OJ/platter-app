const isProd = !require("electron-is-dev");

export const config = {
  isProd,
  dbUrl: isProd
    ? "https://platter-db.herokuapp.com/"
    : "https://platter-db-dev.herokuapp.com/",
  apiUrl: isProd
    ? "https://platter-api.herokuapp.com/graphql"
    : "http://localhost:3001/graphql",
};
