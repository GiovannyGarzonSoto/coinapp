import app from './app'
import {databaseConnection} from './database'

const main = async() => {
    app.listen(app.get('port'))
    console.log(`Server running on port ${app.get('port')}`)
    databaseConnection()
}   

main()