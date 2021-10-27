import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { setLang } from "../preferences/preferencesSlice";


console.log("WS connect");
const WS_BASE_URL = process.env.REACT_APP_VIRTUAL_ME_WS_BASE_URL || '';

export const getSocket = (token: any) => {
  const socket = io(WS_BASE_URL, { transports: ["websocket"], auth: { token } });
  socket.on("connect", () => {
    console.log("connected")
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  });
  socket.on("test", (eventName, data) => {
    console.log("Test received");
    console.log(eventName); // ojIckSD2jqNzOqIrAGzL
    console.log(data);
  });

  return socket;
}

