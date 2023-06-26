import express from "express";
import { Players } from "../models/Players";
import { dBase } from "../DataSource";

class PlayerClass {
    Create: express.RequestHandler =
    async (req, res, next) => {
        try {
            const newPlayer = dBase
                .getRepository(Players)
                .create(req.body);
            const player = await dBase
                .getRepository(Players)
                .save(newPlayer);
            res.json(player);
        } catch (error: any) {
            res.status(500).json(error.message);
            next(error);
        }
    };

    FetchAll: express.RequestHandler =
    async (req, res, next) => {
        try {
            const players = await dBase
                .getRepository(Players)
                .find()
            res.json(players);
        } catch (error: any) {
            res.status(500).json(error.message);
            next(error);
        }
    };

    GetOne: express.RequestHandler =
    async (req, res, next) => {
        try {
            const player = await dBase
            .getRepository(Players)
            .findOneBy({ id: req.params.id })
            res.json(player);
        } catch (error: any) {
            res.status(500).json(error.message);
            next(error);
        }
    };

    Update: express.RequestHandler =
    async (req, res, next) => {
        try {
            const player = await dBase.getRepository(Players)
            .findOneOrFail({
                where: { id: req.params.id }});
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

    Delete: express.RequestHandler =
    async (req, res, next) => {
        try {
            const player = await dBase
                .getRepository(Players)
                .delete(req.params.id);
            res.json(player);
        } catch (error: any) {
            res.status(500).json(error.message);
            next(error);
        }
    };
};

export const PLAYER: PlayerClass = new PlayerClass();



