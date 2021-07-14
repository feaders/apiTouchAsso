import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';


const Participe = sequelize.define('participe', {
   groupe: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
   },
   user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
   },

});
export default Participe;