import { Router } from 'express';
import { sample_jewels } from '../data';

const router = Router();

router.get("/", (req, res) =>{
    res.send(sample_jewels);
})

router.get("/:jewelId", (req, res) => {
    const jewelId = req.params.jewelId;
    const jewel = sample_jewels.find(jewel => jewel.id == jewelId);
    res.send(jewel);
})

export default router;