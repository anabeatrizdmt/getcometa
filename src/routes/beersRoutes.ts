import express from "express";
import { beersController } from "../controllers/beersController";

const router = express.Router();

router.get('/list', beersController.getBeers);

export default router;