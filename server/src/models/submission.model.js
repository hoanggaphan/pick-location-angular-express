import { DataTypes } from 'sequelize';

export default (sequelize) => {
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

  return Submission;
};
