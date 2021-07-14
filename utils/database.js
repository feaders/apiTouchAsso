import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('api.touchasso', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
});

export default sequelize;
