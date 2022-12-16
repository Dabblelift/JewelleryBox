import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/user.model';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments();
        if(userCount > 0){
            res.send("Data is already seeded.");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Data is seeded successfully.");
    }
))

router.post("/login", async (req,res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne( {email, password} );

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Email or Password is not correct!")
    }
})

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
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