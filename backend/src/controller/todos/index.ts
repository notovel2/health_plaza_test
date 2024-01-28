import { RequestHandler } from "express";
import MemDatabase from "../../lib/mem_database";

interface ToDo {
    id: number;
    title: string;
    createdAt: Date;
}

const todosDb = new MemDatabase<ToDo>();

export const getController: RequestHandler = async (req, res) => {
    try {
        const data = todosDb.readAll();
        res.json(data);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
};

export const createController: RequestHandler = async (req, res) => {
    try {
        todosDb.insert({ title: req.body.title, createdAt: new Date() })
        res.status(201).send('create todo item successfully');
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
};

export const updateController: RequestHandler = async (req, res) => {
    try {
        todosDb.update(parseInt(req.params.id), req.body);
        res.status(200).send('update todo item successfully');
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
};

export const removeController: RequestHandler = async (req, res) => {
    try {
        todosDb.remove(parseInt(req.params.id));
        res.status(200).send('remove todo item successfully');
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
};
