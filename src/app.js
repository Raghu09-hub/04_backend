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

// for url  excoder

app.use(express.urlencoded({extended:true,limit:"16kb"}))

// if i want to store the public assert

app.use(express.static("public"))

app.use(cookieParser())



export {app}