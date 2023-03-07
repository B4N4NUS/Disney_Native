// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import 'firebase/compat/auth'
import { IUserListArray } from "../logic/Interfaces/IUserListArray";
import { ICommentArray } from "../logic/Interfaces/ICommentArray";

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

// Получения информации о группах пользователя
const getCloudData = async () => {
    try {
        const docRef = doc(db, "users", auth.currentUser.email)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data().data
        } else {
            console.log("No users")
            return { data: [] }
        }
    } catch (e) {
        alert(e.message)
    }
}

// Сохранение групп пользователя
const storeCloudData = async (value: IUserListArray) => {
    try {
        const docRef = await setDoc(doc(db, "users", auth.currentUser.email), {
            data: value
        })
    } catch (e) {
        alert(e.message)
    }
}

// Получение информации о комментах пользователя
const getCloudDataComments = async () => {
    try {
        const docRef = doc(db, "comments", auth.currentUser.email)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data().data
        } else {
            console.log("No comments")
            return { data: [] }
        }
    } catch (e) {
        alert(e.message)
    }
}

// Сохранение комментов пользователя
const storeCloudDataComments = async (value: ICommentArray) => {
    try {
        const docRef = await setDoc(doc(db, "comments", auth.currentUser.email), {
            data: value
        })
    } catch (e) {
        alert(e.message)
    }
}

export { auth, app, db, getFirestore, doc, setDoc, getDoc, getCloudData, storeCloudData, getCloudDataComments, storeCloudDataComments }