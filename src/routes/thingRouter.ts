import express, { type Request, type Response } from 'express'
import type Thing from '../types/thing'
import * as thingModel from '../models/thing'

const thingRouter = express.Router()

// on est déjà dans la route /things qu'on a défini dans l'index.ts
thingRouter.get('/', async (req: Request, res: Response) => {
  thingModel.findAllThings((error: Error, things: Thing[]) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(200).json({ data: things })
  })
})

thingRouter.post('/', async (req: Request, res: Response) => {
  const newThingName: string = req.body.name
  thingModel.createThing(newThingName, (error: Error, thingId: number) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(201).json({ thingId })
  })
})

thingRouter.get('/:id', async (req: Request, res: Response) => {
  const thingId: number = Number(req.params.id)
  thingModel.findOneThing(thingId, (error: Error, thing: Thing) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(200).json({ data: thing })
  })
})

thingRouter.put('/:id', async (req: Request, res: Response) => {
  // const thing: Thing = req.body
  const newThingName: string = req.body.name
  const thingId: number = Number(req.params.id)

  thingModel.updateThing(newThingName, thingId, (error: Error) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(200).send()
  })
})

thingRouter.delete('/:id', async (req: Request, res: Response) => {
  const thingId: number = Number(req.params.id)
  thingModel.deleteThing(thingId, (error: Error) => {
    if (error) {
      return res.status(500).json({ message: error.message })
    }

    return res.status(200).send()
  })
})

export default thingRouter
