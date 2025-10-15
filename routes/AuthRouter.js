import { Router } from "express";
import { LoginController } from "../controllers/LoginController.js";


export const AuthRouter = Router()


AuthRouter.post("/user/create", async(req, res) => {
    const login = req.body.login
    const pass = req.body.pass
    const mail = req.body.email

    const lgController = new LoginController()
    const data = await lgController.createUser(login, pass, mail)
    console.log(data)
    return res.json(data)
})

AuthRouter.post("/auth", async(req, res)=>{
    const login = req.body.login
    const pass = req.body.pass

    let lgController = new LoginController()
    let result = await lgController.authUser(login, pass)
    if(result.status == "success"){
        res
        .cookie("access_token", result.jwt, {
            httpOnly: true,
            secure: true,
        })
        .json(result)
    }else{
        res.status(400).json(result)
    }

})

AuthRouter.post("/ping", (req, res)=>{
    return res.json({msg: "pong"})
})