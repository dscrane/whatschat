import { log } from "../utils/logs.js";

export const joinChatroom = async (
  socket,
  newChatroomName,
  oldChatroomName,
  userName,
  cb
) => {
  console.log(newChatroomName, oldChatroomName);
  await socket.leave(oldChatroomName);
  await socket.join(newChatroomName);
  log.socket(socket.id, `has joined room`, newChatroomName);
  // const joinedMessage = {
  //   message: `You have entered the chat`,
  //   author: "system",
  //   chatroomName: newChatroomName,
  // };
  // await socket.emit("system-message", newChatroomName, { ...joinedMessage });
  cb(`%cjoin-room %c${newChatroomName} %ccomplete`);

  await socket.emit("fetch-messages", newChatroomName);

  // socket.broadcast.emit("return-message", newChatroomName, { ...joiningMessage })
};
