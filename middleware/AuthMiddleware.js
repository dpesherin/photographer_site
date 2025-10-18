import { LoginController } from "../controllers/LoginController.js"

export const AuthMiddleware = async(req, res, next) =>
{
    let lgController = new LoginController()
    let decoded = await lgController.checkJwt(req.cookies.access_token)
    if(!decoded){
        return res.status(301).redirect("/login")
    }
    next()
}