import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import http from "http"
import {MainPageController} from './controllers/MainPageController.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("static"))

const httpServer = http.createServer(app)

app.get("/", async(req, res)=>{
    const mpController = new MainPageController()
    let content = await mpController.getPageContent()
    let infoCards = await mpController.getInfoCards()
    return res.render("main", {cont: content, info: infoCards})
})

httpServer.listen(process.env.HTTPPORT, ()=>{
    console.log(`Server was started on port ${process.env.HTTPPORT}`)
})