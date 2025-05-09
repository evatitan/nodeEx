import express, { Router } from "express";

const app = express()
const router = Router()

app.get("/", (req, res) => { 
  res.json({message:"user API"})
})

export default router