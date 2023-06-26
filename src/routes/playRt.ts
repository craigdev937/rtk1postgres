import express from "express";
import { PLAYER } from "../controllers/playCon";

export const playRt: express.Router = express.Router();
    playRt.post("/", PLAYER.Create);
    playRt.get("/", PLAYER.FetchAll);


