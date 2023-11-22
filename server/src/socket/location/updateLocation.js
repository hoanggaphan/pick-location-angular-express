import {
  emitNotifyToArray,
  pushSocketIdToArray,
  removeSocketIdFromArray,
} from '../../helpers/socket.helper.js';

const updateLocation = (io) => {
  let clients = {};

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    clients = pushSocketIdToArray(clients, userId, socket.id);

    socket.on('update-location', (location) => {
      const userIdRecieve = location.userId;
      if (userIdRecieve) {
        emitNotifyToArray(
          clients,
          userIdRecieve,
          io,
          'response-update-location',
          location
        );
      }
    });

    socket.on('disconnect', () => {
      clients = removeSocketIdFromArray(clients, userId, socket);
    });
  });
};

export default updateLocation;
