import express, { Router } from "express";

const app = express()
const router = Router()

app.get("/", (req, res) => { 
  res.json({message:"index API"})
})


export default router