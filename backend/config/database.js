import Sequelize from 'sequelize'
import { DB } from './default'

export default new Sequelize(DB.database, DB.username, DB.password, {
    host: DB.host,
    port: DB.port,
    dialect: DB.dialect,
})
