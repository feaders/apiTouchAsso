import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('univcergy18', 'univcergy18', 'esieeit2021', {
    dialect: 'mysql',
    host: 'cl1-sql9.phpnet.org',
    port: 3306
});

export default sequelize;
