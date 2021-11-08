import { firebaseConfig } from "../keys.key"
import * as admin from 'firebase-admin'
import { User } from "../types/user"

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://lotto-48a43-default-rtdb.europe-west1.firebasedatabase.app/"
})


const db = admin.database();
const ref = db.ref("users");

export default {
    
    allusers () {
        const data: any = []
        ref.once("value", function(snapshot) {
            data.push(snapshot.val())
        })

        return data
    },

    addUser (user: User) {

    }
}