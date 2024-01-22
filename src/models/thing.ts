import type Thing from '../types/thing'
import connection from '../db-config'
import { type ResultSetHeader as OkPacket, type RowDataPacket } from 'mysql2'
// OkPacket is deprecated
// import { OkPacket, RowDataPacket } from "mysql2";

/**
 * @param name
 * @param callback
 * @description insérer des données dans la DB
 */
export const createThing = (name: string, callback: Function) => {
  const queryString = 'INSERT INTO thing (name) VALUES (?)'

  connection.query(queryString, [name], (error, result) => {
    // si il y a une erreur, on l'a donne au controller
    // ce n'est pas au model de gérer les réponses de type 200, 300 etc.. ni les requêtes types HTTP etc..
    if (error) {
      callback(error)
    }

    // result arrive sous forme de RowDataPacket qui n'est pas très exploitable du coup on le cast en OkPacket
    // et que quand il n'y a pas d'erreur, on arrive a avoir accès au insertId
    const inserId = (result as OkPacket).insertId
    callback(null, inserId)
  })
}

/**
 *
 * @param thingId
 * @param callback
 * @description pour récupérer un élément dans la DB à l'aide de son id
 */
export const findOneThing = (thingId: number, callback: Function) => {
  const queryString = 'SELECT * FROM thing where id = ?'
  connection.query(queryString, [thingId], (error, result) => {
    if (error) {
      callback(error)
    }

    // RowDataPacket est un type classique de SQL
    // on récupère la première chose, après il ne peut y en avoir que un de cet id, si c'est callback
    const row = (result as RowDataPacket)[0]
    const thing: Thing = {
      id: row.id,
      name: row.name,
    }
    // on le renvoie au callback le résultat
    callback(null, thing)
  })
}

/**
 *
 * @param thingId
 * @param callback
 * @description pour récupérer tous les éléments de la db
 */
export const findAllThings = (callback: Function) => {
  const queryString = 'SELECT * FROM thing'
  connection.query(queryString, (error, result) => {
    if (error) {
      callback(error)
    }

    const rows = result as RowDataPacket[]
    const things: Thing[] = []
    rows.forEach((row) => {
      const thing: Thing = {
        id: row.id,
        name: row.name,
      }
      things.push(thing)
    })
    callback(null, things)
  })
}

/**
 *
 * @param thingId
 * @param callback
 * @description pour update un élément dans la DB à l'aide de son id
 */
export const updateThing = (newName: string, id:number, callback: Function) => {
  const queryString = 'UPDATE thing SET name = ? WHERE id = ?'
  connection.query(queryString, [newName, id], (error) => {
    if (error) {
      callback(error)
    }

    callback(null)
  })
}

/**
 *
 * @param thingId
 * @param callback
 * @description pour delete un élément dans la DB à l'aide de son id
 */
export const deleteThing = (thingId: number, callback: Function) => {
  const queryString = 'DELETE FROM thing WHERE id = ?'
  connection.query(queryString, [thingId], (error) => {
    if (error) {
      callback(error)
    }

    callback(null)
  })
}
