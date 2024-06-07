import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCf5XpmpWGVGuvFaD4q9h6JEc9Nqwx33BA",
	authDomain: "clone-mb.firebaseapp.com",
	projectId: "clone-mb",
	storageBucket: "clone-mb.appspot.com",
	messagingSenderId: "922700785431",
	appId: "1:922700785431:web:23daf12eb4f56d52b8f952"
  };

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
