import { Request, Response } from 'express'
import Users, {IUsers} from '../models/Users'
import jwt from 'jsonwebtoken'

class AuthController {
    public async signup(req: Request, res: Response): Promise<Response> {
        try{
            const {name, email, password, google, role, active} = req.body
            const newUser: IUsers = new Users({
                name,
                email,
                password,
                google,
                role,
                active,
                updatedAt: Date.now(),
                createdAt: Date.now()
            })
            newUser.password = await newUser.encryptPassword(newUser.password)
            const data = await newUser.save()
            if(!data) {
                return res.status(500).json({
                    success: false,
                    message: 'No se pudo guardar el Usuario'
                })
            }
            res.json({
                sucess: true,
                data
            })
        }catch(err) {
            return res.status(500).json({
                success: false,
                message: 'No se pudo registrar el Usuario',
                err
            })
        }
    }

    public async signin(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Users.findOne({name: req.body.name})
            if(!data) {
                return res.status(400).json({
                    sucess: false,
                    message: 'No se ha encontrado el email del Usuario'
                })
            }
            const correctPassword: boolean = await data.validatePassword(req.body.password)
            if(!correctPassword){
                return res.status(400).json({
                    success: false,
                    message: 'Contraseña erronea'
                })
            }

            const payload = {
                _id: data._id,
                name: data.name,
                role: data.role
            }
            console.log(payload)

            const token = jwt.sign(payload, process.env.SEED, {
                expiresIn: 60*60*2
            })
            console.log(token)

            res.json({
                success: true,
                token
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se pudo autenticar el Usuario',
                err
            })
        }
    }
}

export const authController = new AuthController()