import React, { createContext, useMemo, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { setLang } from '../preferences/preferencesSlice';
//import { useDispatch, Provider } from 'react-redux';
import { getSocket } from './socketUtil';

const WebSocketContext = createContext({ socket: null })
export { WebSocketContext }


type WebSocketProviderProps = {
  children: any,
  auth?: any
}

function WebSocketProvider(props: WebSocketProviderProps) {

  const { children, auth } = props;
  const dispatch = useDispatch();
  //const location = useLocation();
  //const params = useParams();
  
  const ws: any = useMemo(() => {
    if (auth.jwt) {
      console.info("WebSocketProvider socket initialization");
      return { socket: getSocket(auth.jwt) }
    } else {
      return {};
    }
  }, [auth.jwt]);

  //Init socket actions once ws is initialized
  useEffect(() => {
    if(ws.socket) {
      ws.socket.on("changeLang", (lang: any) => {
        console.log("langChanged");
        console.log(lang);
        dispatch(setLang(lang))
        });

    }

  }, [ws]) 
  
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


  
  return <WebSocketContext.Provider value={ ws } >
    { children }
    </WebSocketContext.Provider> 
    

}

const mapStateToProps = (state: any) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(WebSocketProvider);

