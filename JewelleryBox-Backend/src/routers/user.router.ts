import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if (userCount > 0) {
            res.send("Data is already seeded.");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Data is seeded successfully.");
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password,user.password))) {
            res.send(generateTokenResponse(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("Email or Password is not correct!")
        }
    }))

router.post('/register', asyncHandler(
    async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(user){
            res.status(HTTP_BAD_REQUEST).send("This email is already registered.")
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser:User = {
            id:'',
            firstName,
            lastName, 
            email: email.toLowerCase(),
            password: encryptedPassword,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
       id: user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: '30d'
    });

    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        token: token
    };
}


export default router;