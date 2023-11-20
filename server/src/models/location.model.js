import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db.config.js';
import Submission from './submission.model.js';

const Location = sequelize.define('Location', {
  placeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  types: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('approve', 'deny', 'pending'),
    allowNull: false,
    defaultValue: 'pending',
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

Location.belongsTo(Submission, { foreignKey: 'submissionId' });

export default Location;
