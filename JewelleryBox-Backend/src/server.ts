import express from "express";
import cors from "cors";
import { sample_jewels } from "./data";

const app = express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/jewels", (req, res) =>{
    res.send(sample_jewels);
})

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})