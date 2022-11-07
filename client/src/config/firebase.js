import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjot35W_RH8s-hUaecC3N--xn8DSQdlag",
  authDomain: "doc-upload-dc876.firebaseapp.com",
  projectId: "doc-upload-dc876",
  storageBucket: "doc-upload-dc876.appspot.com",
  messagingSenderId: "918039644208",
  appId: "1:918039644208:web:2d7d0e11edbd3f028145f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://doc-upload-dc876.appspot.com");

export default storage;
