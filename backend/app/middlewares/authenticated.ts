import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
    _id: string
    iat: number
    exp: number
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('token')
    if(!token) {
        return res.json({
            success: false,
            message: 'Entrada no autorizada'
        })
    }
    const decoded = jwt.verify(token, process.env.SEED) as IPayload

    if(!decoded){
      return res.status(401).json({
        mensaje: 'Usuario no válido.'
      })
    }
    req.user = decoded
    next()
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user.role

    if(role === 'ADMIN'){
        next()
    }else {
        return res.status(401).json({
            success: false,
            message: 'Usuario no válido para realizar esta accion.'
        })
    }
}