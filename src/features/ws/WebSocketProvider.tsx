import React, { createContext, useMemo, useEffect } from 'react'
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
//import { useDispatch, Provider } from 'react-redux';
import { getSocket } from './socketUtil';

const WebSocketContext = createContext(null)
export { WebSocketContext }


type WebSocketProviderProps = {
  children: any,
  auth?: any
}

function WebSocketProvider(props: WebSocketProviderProps) {

  const { children, auth } = props;
  //const location = useLocation();
  //const params = useParams();
  
  const ws = useMemo(() => {
    if (auth.jwt) {
      console.info("WebSocketProvider socket initialization")
      return { socket: getSocket(auth.jwt) }
    } else {
      return {};
    }
  }, [auth.jwt]);
  
  const sendMessage = (roomId: string, message: string) => {
    const payload = {
      roomId: roomId,
      data: message
    }
    //socket.emit("event://send-message", JSON.stringify(payload));
    //dispatch(updateChatLog(payload));
  }
  
/*   const ws: any = {
    socket: socket,
    sendMessage
  }; */


  
  return <WebSocketContext.Provider value={(ws !== null)?ws:{} } >
    { children }
    </WebSocketContext.Provider> 
    

}

const mapStateToProps = (state: any) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(WebSocketProvider);

