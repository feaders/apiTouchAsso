import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Message = sequelize.define('message', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   text: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   date: {
      type: Sequelize.DATE,
   },
   typeDestinataire: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   destinataire: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   emetteur: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   vues: {
      type: Sequelize.STRING,
   },
});
Message.sync();
export default Message;