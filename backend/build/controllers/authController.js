"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, google, role, active } = req.body;
                const newUser = new Users_1.default({
                    name,
                    email,
                    password,
                    google,
                    role,
                    active,
                    updatedAt: Date.now(),
                    createdAt: Date.now()
                });
                newUser.password = yield newUser.encryptPassword(newUser.password);
                const data = yield newUser.save();
                if (!data) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pudo guardar el Usuario'
                    });
                }
                res.json({
                    sucess: true,
                    data
                });
            }
            catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'No se pudo registrar el Usuario',
                    err
                });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Users_1.default.findOne({ name: req.body.name });
                if (!data) {
                    return res.status(400).json({
                        sucess: false,
                        message: 'No se ha encontrado el email del Usuario'
                    });
                }
                const correctPassword = yield data.validatePassword(req.body.password);
                if (!correctPassword) {
                    return res.status(400).json({
                        success: false,
                        message: 'Contraseña erronea'
                    });
                }
                const payload = {
                    _id: data._id,
                    name: data.name,
                    role: data.role
                };
                console.log(payload);
                const token = jsonwebtoken_1.default.sign(payload, process.env.SEED, {
                    expiresIn: 60 * 60 * 2
                });
                console.log(token);
                res.json({
                    success: true,
                    token
                });
            }
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo autenticar el Usuario',
                    err
                });
            }
        });
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map