import express from 'express'
import { userModal } from '../models/user-modal'

export const getAllUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await userModal.find({})

        return res.status(201).json(users)
    } catch (error) {
        res.json({message: 'No users found'})
    }
}

export const deleteUserById = async(req:express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const user = await userModal.findByIdAndDelete(id)

        return res.status(300).json(user)
    } catch (error) {
        res.json({message: 'User deletion failed'})
    }
}

export const updateUser = async(req:express.Request, res:express.Response) => {
    try {
        const {id} = req.params
        const {username, email} = req.body;

        if(!username || !email){
            res.status(500).json({message: "provide both fields"})
        }

        const updateUser = await userModal.findById(id)

        updateUser!.username = username;
        updateUser!.email = email

        await updateUser!.save()

        return res.status(200).json({message: 'Updatation successfull'})
    } catch (error) {
      res.status(500).json({message: "User updation failed"})  
    }
}