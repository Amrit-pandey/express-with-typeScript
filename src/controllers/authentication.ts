import express from 'express'
import { userModal } from '../models/user-modal'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const jwtSecret = 'hbcjhfbcjfjhdbchjsf'

export const register = async(req:express.Request, res: express.Response) => {
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password) {
           return res.status(400).json({message: 'No fields are available'})
        }

        const existingUser = await userModal.findOne({email})

        if(existingUser){
           return res.status(201).json({message: 'Email already exist'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = await userModal.create({
            username,
            email,
            authentication: {
                salt,
                password: hashedPassword
            }
        })
        await user.save()
        res.json({message: "Registration successfull"})
    } catch (error) {
        res.status(400).json({message: "Registration failed"})
        console.log(error)
    };
}

export const login = async(req:express.Request, res:express.Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(201).json({message: 'Email and password are required'})
        }

        const user = await userModal.findOne({email}).select('+authentication.password +authentication.salt')

        if(!user || !user.authentication || !user.authentication.password){
            return res.status(400).json({message: 'Invalid email and password'})
        }

        const isValidPassword = bcrypt.compareSync(password, user.authentication?.password)

        if(!isValidPassword){
            return res.json({message: 'Invalid password'})
        }

        const token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn: 360000})

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

        res.status(200).json({message: 'Login successfull'})

    } catch (error) {
        res.status(400).json({message: 'Login failed.'})
    }
}

export const logout = (req: express.Request, res: express.Response) => {
    res.cookie("token" ,"").json(true);
}