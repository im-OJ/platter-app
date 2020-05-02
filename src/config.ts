const isProd = !require("electron-is-dev");
const useLocalApi = !isProd && true;

export const config = {
  isProd,
  apiUrl: useLocalApi
    ? "http://localhost:5001/platter-app-dev/us-central1/api"
    : isProd
    ? "https://us-central1-platter-app-8a7ce.cloudfunctions.net/api"
    : "https://us-central1-platter-app-dev.cloudfunctions.net/api",
  firebaseOptions: isProd
    ? {
        apiKey: "AIzaSyCBSE-x0NmHG2C4roY16qhqzFzKiDPSd3w",
        authDomain: "platter-app-8a7ce.firebaseapp.com",
        databaseURL: "https://platter-app-8a7ce.firebaseio.com",
        projectId: "platter-app-8a7ce",
        storageBucket: "platter-app-8a7ce.appspot.com",
        messagingSenderId: "621907320578",
        appId: "1:621907320578:web:8af41bba8c3be5dfd66c1b",
        measurementId: "G-E1HFYBNCXG",
      }
    : {
        apiKey: "AIzaSyA0wODCIgLPMUQSi-ot5G5ldA6MHF611cE",
        authDomain: "platter-app-dev.firebaseapp.com",
        databaseURL: "https://platter-app-dev.firebaseio.com",
        projectId: "platter-app-dev",
        storageBucket: "platter-app-dev.appspot.com",
        messagingSenderId: "279231398902",
        appId: "1:279231398902:web:c741a46c4fcbd149d03dd7",
        measurementId: "G-MBB79YN5YH",
      },
};
