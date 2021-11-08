import collection from "../model/firestore"
import { Request, Response } from "express"

function index  (req: Request, res: Response) {
    res.status(200).json({ name: 'yoyo' })
}

async function allCollections (req: Request, res: Response) {
    // request collection as noted bellow
    // note : await collection.allCollection('users')
    const users = await collection.allCollection('users')
    const lottoTickets = await collection.allCollection('lottoTickets')
    const pendingTickets = await collection.allCollection('pendingTickets')

    // return all user collections in use here
    res.status(200).json({
        req: req.query, 
        params: req.params , 
        dbCollectionsInUse: {
            users: users,
            lottoTickets: lottoTickets,
            pending_Tickets: pendingTickets
        }
    })

}

export { index , allCollections }
