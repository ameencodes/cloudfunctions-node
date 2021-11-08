// Initialize Cloud Firestore through Firebase
// import * as admin from "firebase-admin"
import { firebaseConfig } from "../keys.key"
import { initializeApp } from "firebase/app"
import {  getFirestore, collection, getDocs, doc, addDoc, Timestamp } from "firebase/firestore"
// initialize firebase app

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default {

    async allCollection(collectionName: string) {
        const requestedCollection = collection(db, collectionName);
        const colectionSnapshot = await getDocs(requestedCollection);
        const result = colectionSnapshot.docs.map((doc: any) => doc.data());
        return result;
    },

    // handle user Model

    async addUser (user: any) {
        user.timestamp = Timestamp.fromDate(new Date())
        const record = await addDoc(collection(db, "users"), user);
        // addDoc(doc(db, "users"), user)
        console.log(record)
        return record
    },

    async UpdateUser () {
        
    },

    async deleteUser () {

    }
}