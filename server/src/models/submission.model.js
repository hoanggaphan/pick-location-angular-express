import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';
import User from './user.model.js';

const Submission = sequelize.define('Submission', {
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Submission.belongsTo(User, { foreignKey: 'userId' });

export default Submission;
