import { SqliteRepository } from "../repository/SqliteRepository.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export class LoginController
{
    async createUser(login, pass, mail)
    {
        const sqlRepo = new SqliteRepository();
        const cand = await sqlRepo.findOne(`SELECT * FROM users WHERE LOGIN='${login}' OR EMAIL='${mail}'`)
        if(cand){
            return {
                status: "err",
                err: "User with this login or email already exists"
            }
        }
        const encPass = bcrypt.hashSync(pass, 7)
        const res = await sqlRepo.insert(`INSERT INTO users (LOGIN, PASS, EMAIL) VALUES ('${login}', '${encPass}', '${mail}')`)
        if(!res){
            return {
                status: "err",
                err: "Error while creating user"
            }
        }
        return {
                status: "success",
                data: {
                    login: login,
                    mail: mail,
                    id: res.lastID
                }
            }
    }

    async authUser(login, pass)
    {
        const sqlRepo = new SqliteRepository();
        const cand = await sqlRepo.findOne(`SELECT * FROM users WHERE LOGIN='${login}'`)
        if(cand){
            let isCompared = bcrypt.compareSync(pass, cand.PASS)
            if(isCompared){
                let jwtoken = jwt.sign(
                    {
                        id: cand.ID,
                        login: cand.LOGIN,
                        email: cand.EMAIL
                    },
                    process.env.JWTSALT
                )
                return {
                    status: "success",
                    jwt: jwtoken
                }
            }else{
                return {
                    status: "err",
                    err: "Неверные авторизационные данные"
                }
            }
        }else{
            return {
                status: "err",
                err: "Пользователь не найден"
            }
        }
    }

    async checkJwt(jwtoken){
        try {
            let decoded = jwt.verify(jwtoken, process.env.JWTSALT)
            return decoded
        } catch (error) {
            return false
        }
    }
}