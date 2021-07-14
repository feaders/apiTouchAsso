import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Groupe = sequelize.define('groupe', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   nom: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   description: {
      type: Sequelize.STRING,
   },
});

export default Groupe;