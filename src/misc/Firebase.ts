// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore"
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMtU8JMfm6ZlOutBh3n6NhoMVVw8QUlL8",
  authDomain: "disneynative-ac06d.firebaseapp.com",
  projectId: "disneynative-ac06d",
  storageBucket: "disneynative-ac06d.appspot.com",
  messagingSenderId: "891686801404",
  appId: "1:891686801404:web:38d1afb18542c3f09aac79"
};

// Initialize Firebase
let app
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}
const auth = firebase.auth()
const db = getFirestore(app)

export {auth, app, db, getFirestore, doc, setDoc, getDoc}