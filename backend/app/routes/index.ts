import express, {Application} from 'express'
import authRoutes from './authRoutes'

const app: Application = express()

app.use('/api/', authRoutes)

module.exports = app 