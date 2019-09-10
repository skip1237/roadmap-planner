import * as firebase from "firebase";

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_APIKEY,
  authDomain: process.env.REACT_APP_PROD_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASEURL,
  projectId: process.env.REACT_APP_PROD_PROJECTID,
  storageBucket: process.env.REACT_APP_PROD_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_PROD_APPID
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_APIKEY,
  authDomain: process.env.REACT_APP_DEV_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASEURL,
  projectId: process.env.REACT_APP_DEV_PROJECTID,
  storageBucket: process.env.REACT_APP_DEV_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_DEV_APPID
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth, firebase };
