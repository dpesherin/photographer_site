import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import http from "http"
import {MainPageController} from './controllers/MainPageController.js'
import { LoginController } from './controllers/LoginController.js'
import {AuthRouter} from "./routes/AuthRouter.js"
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("static"))
app.use(cookieParser())

app.use("/api", AuthRouter)

const httpServer = http.createServer(app)

app.get("/", async(req, res)=>{
    const mpController = new MainPageController()
    let content = await mpController.getPageContent()
    let infoCards = await mpController.getInfoCards()
    return res.render("main", {cont: content, info: infoCards})
})

app.get("/login", async (req, res)=>{
    let lgController = new LoginController()
    let decoded = await lgController.checkJwt(req.cookies.access_token)
    if(decoded){
        return res.status(301).redirect("/admin")
    }
    return res.render("login", {})
})

app.get("/admin", async(req, res)=>{
    let lgController = new LoginController()
    let decoded = await lgController.checkJwt(req.cookies.access_token)
    if(!decoded){
        return res.status(301).redirect("/login")
    }
    return res.render("admin", {})
})


httpServer.listen(process.env.HTTPPORT, ()=>{
    console.log(`Server was started on port ${process.env.HTTPPORT}`)
})