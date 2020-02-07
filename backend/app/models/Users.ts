import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUsers extends Document{
    name: string
    email?: string
    password: string
    google?: boolean
    role?: string
    active?: boolean
    createdAt: Date
    updatedAt?: Date
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
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
})

userSchema.methods.encryptPassword = async(password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(16)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

export default model<IUsers>('Users', userSchema)