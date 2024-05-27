import { Request, Response } from "express";

interface CreateUser {
    username: string,
    email: string,
    password: string
}

export const getUser = (req: Request, res: Response) => {
    res.send({message: 'Hello User'})
}

export const getUserById = (req: Request, res: Response) => {
    const {id} = req.params
    res.send({id: id})
}

export const createUser = (req: Request<{},{},CreateUser>, res: Response) => {
    const { email, password, username } = req.body
    res.send({email, password, username})
}