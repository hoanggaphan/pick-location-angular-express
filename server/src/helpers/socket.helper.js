export const pushSocketIdToArray = (clients, userId, socketId) => {
  if (clients[userId]) {
    clients[userId].push(socketId);
  } else {
    clients[userId] = [socketId];
  }
  return clients;
};

export const emitNotifyToArray = (clients, userId, io, eventName, data) => {
  clients[userId].map((socketId) => io.to(socketId).emit(eventName, data));
};

export const removeSocketIdFromArray = (clients, userId, socket) => {
  clients[userId] = clients[userId].filter(
    (socketId) => socketId !== socket.id
  );
  if (!clients[userId].length) {
    delete clients[userId];
  }
  return clients;
};
