import Sequelize from 'sequelize';
import User from '../models/user.model.js';
import Location from '../models/location.model.js';

const configs = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(configs.DB, configs.USER, configs.PASSWORD, {
  host: configs.HOST,
  dialect: configs.dialect,

  pool: {
    max: configs.pool.max,
    min: configs.pool.min,
    acquire: configs.pool.acquire,
    idle: configs.pool.idle,
  },
});

const connectDB = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Synced db.');
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message);
    });
};

const db = {
  users: User(sequelize),
  locations: Location(sequelize),
};

// db.users.hasMany(db.locations, { foreignKey: 'UserId', onDelete: 'CASCADE' });
// db.locations.belongsTo(db.users, { foreignKey: 'UserId' });

export { connectDB, sequelize, db };
