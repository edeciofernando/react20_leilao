import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAngfUGWn_LraE4HXsHkufc9-Lvlgqn6IE",
  authDomain: "leilaoobras.firebaseapp.com",
  databaseURL: "https://leilaoobras.firebaseio.com",
  projectId: "leilaoobras",
  storageBucket: "leilaoobras.appspot.com",
  messagingSenderId: "807011193786",
  appId: "1:807011193786:web:4a736e9418304a9ff84383",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();