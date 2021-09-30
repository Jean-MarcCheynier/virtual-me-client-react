import React from 'react';
import ButtonLight from '../../components/custom/buttons/ButtonLight';
import { ChatLayout, setLayout, selectChatLayout } from './chatSlice';
import { FaMinus, FaClone, FaExternalLinkSquareAlt } from 'react-icons/fa';
import { connect, useDispatch } from 'react-redux';

const ButtonGroup = (props: any) => {
  
  const { chatLayout } = props;
  const dispatch = useDispatch();
  
  const setFloatting = () => {
    dispatch(setLayout(ChatLayout.FLOATING))
  }

  const setFix = () => {
    dispatch(setLayout(ChatLayout.FIXED))
  }

  const setBubble = () => {
    dispatch(setLayout(ChatLayout.BUBBLE))
  }
  
  return (
    <div className="mb-2 d-flex flex-row-reverse">
      { chatLayout === ChatLayout.FIXED &&
      <>
        <ButtonLight className="ml-1" onClick={setFloatting} id='chat.btn.layout.floating' tooltip='chat.btn.layout.floating'>
          <FaClone/>
        </ButtonLight >
        <ButtonLight onClick={setBubble} id='chat.btn.layout.bubble' tooltip='chat.btn.layout.bubble'>
          <FaMinus/>
        </ButtonLight>
      </>}
      { chatLayout === ChatLayout.FLOATING &&
      <>
        <ButtonLight className="pt-0 ml-1" onClick={setFix} id='chat.btn.layout.fixed' tooltip='chat.btn.layout.fixed'>
          <FaExternalLinkSquareAlt />
        </ButtonLight >
        <ButtonLight onClick={setBubble} id='chat.btn.layout.bubble' tooltip='chat.btn.layout.bubble'>
          <FaMinus />
        </ButtonLight >
      </>}
    </div> )
  }


const mapStateToProps = (state: any) => ({
  chatLayout: selectChatLayout(state)
})

export default connect(mapStateToProps, null)(ButtonGroup)