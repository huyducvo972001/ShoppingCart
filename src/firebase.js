import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlrjJTiPoOX5TFDasRFFbYm5NdnouM-xY",
  authDomain: "tech-store-44eac.firebaseapp.com",
  databaseURL: "https://tech-store-44eac-default-rtdb.firebaseio.com",
  projectId: "tech-store-44eac",
  storageBucket: "tech-store-44eac.appspot.com",
  messagingSenderId: "260754509634",
  appId: "1:260754509634:web:da6cb682884415132b02db",
  measurementId: "G-ZWY27RHE63",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
