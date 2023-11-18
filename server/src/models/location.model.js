import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
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

  return Location;
};
