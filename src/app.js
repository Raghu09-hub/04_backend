import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb",
}))

// for url  excoder like for backspace " "is %20
app.use(express.urlencoded({extended:true,limit:"16kb"}))

// if i want to store the public assert

app.use(express.static("public"))

app.use(cookieParser())


//routes imported
 import userRouter from "./routes/user.routes.js"

 //router declaration

  app.use("/api/v1/users",userRouter)

//https://localhost:8000/users/register

export {app}