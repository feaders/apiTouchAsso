import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   type: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   nom: {
      type: Sequelize.STRING,
      allowNull: false,

   },
   prenom: {
      type: Sequelize.STRING,
      allowNull: false,

   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   tel:{
      type: Sequelize.STRING,
   },
   adresse: {
      type: Sequelize.STRING,
   },
   cp: {
      type: Sequelize.STRING,
   },
   ville: {
      type: Sequelize.STRING,
   },
});

export default User;