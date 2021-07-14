import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';
const Parente = sequelize.define('parente', {
   parent: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
   },
   enfant: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
   },

});
export default Parente;