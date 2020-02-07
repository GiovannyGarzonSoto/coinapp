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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de Usuario es obligatorio']
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'La contraseña de Usuario es obligatoria']
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'USER'
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        required: false,
        type: Date
    }
});
userSchema.methods.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(16);
    return bcryptjs_1.default.hash(password, salt);
});
userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(password, this.password);
    });
};
exports.default = mongoose_1.model('Users', userSchema);
//# sourceMappingURL=Users.js.map