"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const thingModel = __importStar(require("../models/thing"));
const thingRouter = express_1.default.Router();
// on est déjà dans la route /things qu'on a défini dans l'index.ts
thingRouter.get('/', async (req, res) => {
    thingModel.findAllThings((error, things) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ data: things });
    });
});
thingRouter.post('/', async (req, res) => {
    const newThingName = req.body.name;
    thingModel.createThing(newThingName, (error, thingId) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(201).json({ thingId });
    });
});
thingRouter.get('/:id', async (req, res) => {
    const thingId = Number(req.params.id);
    thingModel.findOneThing(thingId, (error, thing) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ data: thing });
    });
});
thingRouter.put('/:id', async (req, res) => {
    // const thing: Thing = req.body
    const newThingName = req.body.name;
    const thingId = Number(req.params.id);
    thingModel.updateThing(newThingName, thingId, (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).send();
    });
});
thingRouter.delete('/:id', async (req, res) => {
    const thingId = Number(req.params.id);
    thingModel.deleteThing(thingId, (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).send();
    });
});
exports.default = thingRouter;
