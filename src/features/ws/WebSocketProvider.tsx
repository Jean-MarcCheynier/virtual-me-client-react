import React, { createContext } from 'react'
import { useDispatch, Provider } from 'react-redux';
import { socket } from './socketUtil';

const WebSocketContext = createContext(null)
export { WebSocketContext }


type WebSocketProviderProps = {
  children: any
}

function WebSocketProvider(props: WebSocketProviderProps) {

  const { children } = props;
  const dispatch = useDispatch();
  const sendMessage = (roomId: string, message: string) => {
    const payload = {
      roomId: roomId,
      data: message
    }
    socket.emit("event://send-message", JSON.stringify(payload));
    //dispatch(updateChatLog(payload));
  }

  const ws: any = {
    socket: socket,
    sendMessage
  }
  
  return <WebSocketContext.Provider value= { ws } >
    { children }
    </WebSocketContext.Provider> 
    

}

export default WebSocketProvider;

