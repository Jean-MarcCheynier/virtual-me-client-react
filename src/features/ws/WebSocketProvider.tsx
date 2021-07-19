import React, { createContext } from 'react'
import { useEffect } from 'react';
import { useDispatch, Provider, connect } from 'react-redux';
import { socket } from './socketUtil';
import { ActionCode } from '../../@types/API/bot';

const WebSocketContext = createContext(null)
export { WebSocketContext }


type WebSocketProviderProps = {
  children: any;
  auth?: any;
}

function WebSocketProvider(props: WebSocketProviderProps) {

  const { children, auth } = props;
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (auth.jwt) {
      socket.auth.token = auth.jwt;
      socket.connect();
    }
    
    socket.on(ActionCode.CHANGE_COLOR, (args: any) => {
      console.log(args); // ojIckSD2jqNzOqIrAGzL
    });
    
    
    
  }, [auth, socket])
  

  
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

const mapStateToProps = (state: any) => ({ auth: state.auth })

export default connect(mapStateToProps, null)(WebSocketProvider)

