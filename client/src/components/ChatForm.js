import React, { useRef } from 'react';
import styled from 'styled-components';
import { IoIosSend } from 'react-icons/io'
import { ButtonContainer } from '../styled/Button';
import useChatActions from '../hooks/useChatActions';

const MessageForm = styled.form`
    padding: 0.5vw 0;
    display: flex;
    align-items: center;
    height: 10%;

    border-top: 1px solid rgba(0, 0, 0, 0.08);

    & input {
        flex: 1;
        height: 100%;
        border: none;
    }
`;

const ChatForm = ({ currentRoom, userName }) => {
    const inputRef = useRef(null);
    const { sendMessage } = useChatActions();

    const sendMessageHandler = (e, text) => {
        e.preventDefault();

        inputRef.current.value = '';
        sendMessage(text, currentRoom.id, userName);
    }

    return (
        <MessageForm onSubmit={ (e) => sendMessageHandler(e, inputRef.current.value) }>
            <input type="text" placeholder='Type a message here' ref={ inputRef }/>
            
            <ButtonContainer flex="0" padding="0" active={ true } size="2.2em" borderRadius="50%">
                <button>
                    <IoIosSend fill='#fff'/>
                </button>
            </ButtonContainer>
        </MessageForm>
    );
};

export default ChatForm;