import * as firebase from "firebase";

const prodConfig = {
  apiKey: "AIzaSyCE_hUx_-gDncRWzzYi1t-W18XdZCVjfUc",
  authDomain: "roadmap-planner-dev.firebaseapp.com",
  databaseURL: "https://roadmap-planner-dev.firebaseio.com",
  projectId: "roadmap-planner-dev",
  storageBucket: "",
  messagingSenderId: "991820668796",
  appId: "1:991820668796:web:41936a940d59b874b14ef9"
};

const devConfig = {
  apiKey: "AIzaSyCE_hUx_-gDncRWzzYi1t-W18XdZCVjfUc",
  authDomain: "roadmap-planner-dev.firebaseapp.com",
  databaseURL: "https://roadmap-planner-dev.firebaseio.com",
  projectId: "roadmap-planner-dev",
  storageBucket: "",
  messagingSenderId: "991820668796",
  appId: "1:991820668796:web:41936a940d59b874b14ef9"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth, firebase };
