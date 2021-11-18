import React, { createContext, useMemo, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { setLang } from '../preferences/preferencesSlice';
//import { useDispatch, Provider } from 'react-redux';
import { getSocket } from './socketUtil';
import { useHistory } from 'react-router';

const WebSocketContext = createContext({ socket: null })
export { WebSocketContext }


type WebSocketProviderProps = {
  children: any,
  lang?: string,
  auth?: any
}

function WebSocketProvider(props: WebSocketProviderProps) {

  const { children, auth, lang } = props;
  const dispatch = useDispatch();
  const history = useHistory();
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
        dispatch(setLang(lang))
      });
      ws.socket.on("openPage", (content: any) => {
        if (content.type === "internal") {
          history.push(`/${lang}/chat/${content.page}`);
        } else {
        }

      });

    }

  }, [ws, dispatch, history])
  
/** 
  const sendMessage = (roomId: string, message: string) => {
    const payload = {
      roomId: roomId,
      data: message
    }
    //socket.emit("event://send-message", JSON.stringify(payload));
    //dispatch(updateChatLog(payload));
  }
  */
  
/*   const ws: any = {
    socket: socket,
    sendMessage
  }; */


  
  return <WebSocketContext.Provider value={ ws } >
    { children }
    </WebSocketContext.Provider> 
    

}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  lang: state.preferences.lang
})

export default connect(mapStateToProps, null)(WebSocketProvider);

