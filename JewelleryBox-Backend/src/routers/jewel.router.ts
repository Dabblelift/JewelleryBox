import { Router } from 'express';
import { sample_jewels } from '../data';
import asyncHandler from 'express-async-handler';
import { JewelModel } from '../models/jewel.model';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const jewelsCount = await JewelModel.countDocuments();
        if (jewelsCount > 0) {
            res.send("Data is already seeded.");
            return;
        }

        await JewelModel.create(sample_jewels);
        res.send("Data is seeded successfully.");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const jewels = await JewelModel.find();
        res.send(jewels);
    }
))

router.get("/:jewelId", asyncHandler(
    async (req, res) => {
        const jewel = await JewelModel.findById(req.params.jewelId);
        res.send(jewel);
    }
))

export default router;