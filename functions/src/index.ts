import * as functions from 'firebase-functions'
import * as express from 'express'
import rt from './model/realtimedb'
import { index , allCollections} from './controls/home.controller'
import User from './controls/user.controller'

const app = express()

app.get('/',index)
app.get('/auth/:id', allCollections)

export const api = functions.https.onRequest(app)

// Auth functions
// Trigger new user signUp

export const userCreated = functions.auth.user().onCreate((user: any) => {
    const userData = { 
        userId: user.uid,
        email: user.email, 
        displayname: user.displayname
    }

    rt.addUser(userData)
    User.create(userData)
    console.log("User Profile Created!!!!!!!", user.email, user.uid)
})

// auth trigger user Deleted
export const userDeleted = functions.auth.user().onDelete(user => {
    console.log("User Deleted!", user.email, user.uid)
})