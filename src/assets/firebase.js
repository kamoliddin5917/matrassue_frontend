import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBjHfo6oDjE1ZTBp5YPr288I2YfZ8xNwv0",
  authDomain: "mattress-28847.firebaseapp.com",
  projectId: "mattress-28847",
  storageBucket: "mattress-28847.appspot.com",
  messagingSenderId: "891203817954",
  appId: "1:891203817954:web:690b74b3f3113124f8a9bb",
  measurementId: "G-R6R4EM15R6",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
