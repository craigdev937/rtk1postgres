import express from "express";
import { Players } from "../models/Players";

class PlayerClass {
    Create: express.RequestHandler =
    async (req, res, next) => {
        try {
            const player: Players = new Players();
            player.first = req.body.first;
            player.last = req.body.last;
            player.age = req.body.age;
            player.info = req.body.info;
            player.image = req.body.image;
            await player.save();
            res.status(201).json(player);
        } catch (error: any) {
            res.status(500).json(error.message);
            next(error);
        }
    };

    FetchAll: express.RequestHandler =
    async (req, res, next) => {
        try {
            await Players.find()
            .then((players) => res.status(201)
            .json(players));
        } catch (error: any) {
            res.status(500).json(error.message);
            next(error);
        }
    };
};

export const PLAYER: PlayerClass = new PlayerClass();



