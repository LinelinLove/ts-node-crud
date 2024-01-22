"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThing = exports.updateThing = exports.findAllThings = exports.findOneThing = exports.createThing = void 0;
const db_config_1 = __importDefault(require("../db-config"));
// OkPacket is deprecated
// import { OkPacket, RowDataPacket } from "mysql2";
/**
 * @param name
 * @param callback
 * @description insérer des données dans la DB
 */
const createThing = (name, callback) => {
    const queryString = 'INSERT INTO thing (name) VALUES (?)';
    db_config_1.default.query(queryString, [name], (error, result) => {
        // si il y a une erreur, on l'a donne au controller
        // ce n'est pas au model de gérer les réponses de type 200, 300 etc.. ni les requêtes types HTTP etc..
        if (error) {
            callback(error);
        }
        // result arrive sous forme de RowDataPacket qui n'est pas très exploitable du coup on le cast en OkPacket
        // et que quand il n'y a pas d'erreur, on arrive a avoir accès au insertId
        const inserId = result.insertId;
        callback(null, inserId);
    });
};
exports.createThing = createThing;
/**
 *
 * @param thingId
 * @param callback
 * @description pour récupérer un élément dans la DB à l'aide de son id
 */
const findOneThing = (thingId, callback) => {
    const queryString = 'SELECT * FROM thing where id = ?';
    db_config_1.default.query(queryString, [thingId], (error, result) => {
        if (error) {
            callback(error);
        }
        // RowDataPacket est un type classique de SQL
        // on récupère la première chose, après il ne peut y en avoir que un de cet id, si c'est callback
        const row = result[0];
        const thing = {
            id: row.id,
            name: row.name,
        };
        // on le renvoie au callback le résultat
        callback(null, thing);
    });
};
exports.findOneThing = findOneThing;
/**
 *
 * @param thingId
 * @param callback
 * @description pour récupérer tous les éléments de la db
 */
const findAllThings = (callback) => {
    const queryString = 'SELECT * FROM thing';
    db_config_1.default.query(queryString, (error, result) => {
        if (error) {
            callback(error);
        }
        const rows = result;
        const things = [];
        rows.forEach((row) => {
            const thing = {
                id: row.id,
                name: row.name,
            };
            things.push(thing);
        });
        callback(null, things);
    });
};
exports.findAllThings = findAllThings;
/**
 *
 * @param thingId
 * @param callback
 * @description pour update un élément dans la DB à l'aide de son id
 */
const updateThing = (newName, id, callback) => {
    const queryString = 'UPDATE thing SET name = ? WHERE id = ?';
    db_config_1.default.query(queryString, [newName, id], (error) => {
        if (error) {
            callback(error);
        }
        callback(null);
    });
};
exports.updateThing = updateThing;
/**
 *
 * @param thingId
 * @param callback
 * @description pour delete un élément dans la DB à l'aide de son id
 */
const deleteThing = (thingId, callback) => {
    const queryString = 'DELETE FROM thing WHERE id = ?';
    db_config_1.default.query(queryString, [thingId], (error) => {
        if (error) {
            callback(error);
        }
        callback(null);
    });
};
exports.deleteThing = deleteThing;
