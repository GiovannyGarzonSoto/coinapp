"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.isAuthenticated = (req, res, next) => {
    const token = req.get('token');
    if (!token) {
        return res.json({
            success: false,
            message: 'Entrada no autorizada'
        });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SEED);
    if (!decoded) {
        return res.status(401).json({
            mensaje: 'Usuario no válido.'
        });
    }
    req.user = decoded;
    next();
};
exports.isAdmin = (req, res, next) => {
    const role = req.user.role;
    if (role === 'ADMIN') {
        next();
    }
    else {
        return res.status(401).json({
            success: false,
            message: 'Usuario no válido para realizar esta accion.'
        });
    }
};
//# sourceMappingURL=authenticated.js.map