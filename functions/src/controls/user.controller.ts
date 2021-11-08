import collection from "../model/firestore"
// import { Response } from "express"
import { User } from "../types/user"

export default {

    create (user: User) {
        collection.addUser(user)
        console.log(user)
        return user
    }
}
