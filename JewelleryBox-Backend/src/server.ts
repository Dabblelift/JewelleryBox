import express from "express";
import cors from "cors";
import { sample_jewels, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/jewels", (req, res) =>{
    res.send(sample_jewels);
})

app.get("/api/jewels/:jewelId", (req, res) => {
    const jewelId = req.params.jewelId;
    const jewel = sample_jewels.find(jewel => jewel.id == jewelId);
    res.send(jewel);
  })

app.post("/api/users/login", (req,res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("Email or Password is not correct!")
    }
})

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})