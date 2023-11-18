import { DataTypes } from 'sequelize';

export default (sequelize) => {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  return Location;
};
