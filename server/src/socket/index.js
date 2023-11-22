import updateLocation from './location/updateLocation.js';

const initSockets = (io) => {
  updateLocation(io);
};

export default initSockets;
