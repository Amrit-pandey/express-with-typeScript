import express from 'express'
import { userModal } from './models/user-modal'
import { merge } from 'lodash'
import jwt, { JwtPayload } from 'jsonwebtoken'

const jwtSecret = 'hbcjhfbcjfjhdbchjsf'

export const isAuthenticated =async (req: express.Request, res: express.Response, next: express.NextFunction) =>  {
    try {
        const  token  = req.cookies?.token

        if(!token){
           return res.status(403).json({message: 'unauthorised please login first'})
        }

        let decodedToken: JwtPayload;
        try {
            decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
        } catch (error) {
            return res.status(403).json({ message: 'Invalid token!' });
        }

        const existingUser = await userModal.findById(decodedToken.userId)

        if(!existingUser) {
           return res.status(403).json({message: 'User not found'})
        }

        merge(req, { identity: existingUser })
        next()
    } catch (error) {
        console.log(error)
        res.json({message: 'unauthenticated'}).status(401)
    }
}