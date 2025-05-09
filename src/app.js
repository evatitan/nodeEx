import express from "express"
import dotenv from "dotenv"
import indexRouter from "../routes/index.js"
import userRouter from "../routes/index.js"
import adminArticlesRouter from "../routes/admin/articles.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/admin/articles", adminArticlesRouter)

// check auth
// app.use((req, res, next) => { 
//   console.log("Middleware execute before all routes");
//   next(); 
// })

// app.get("/", (req,res)=>{
//   res.send("DB connect successful")
// })

app.listen(PORT, ()=>{
  console.log("server listen in", PORT)
})

export default app