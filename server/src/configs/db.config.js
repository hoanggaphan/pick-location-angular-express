import Sequelize from 'sequelize';
import SubmissionModel from '../models/submission.model.js';
import LocationModel from '../models/location.model.js';
import UserModel from '../models/user.model.js';

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

const db = {
  submissions: SubmissionModel(sequelize),
  locations: LocationModel(sequelize),
  users: UserModel(sequelize),
};

const connectDB = () => {
  db.submissions.hasMany(db.locations, { foreignKey: 'submissionId' });
  db.locations.belongsTo(db.submissions, { foreignKey: 'submissionId' });
  db.users.hasMany(db.submissions, { foreignKey: 'userId' });
  db.submissions.belongsTo(db.users, { foreignKey: 'userId' });
  db.users.hasMany(db.locations, { foreignKey: 'userId' });
  db.locations.belongsTo(db.users, { foreignKey: 'userId' });

  sequelize
    .sync()
    .then(() => {
      console.log('Synced db.');
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message);
    });
};

export { connectDB, sequelize, db };
