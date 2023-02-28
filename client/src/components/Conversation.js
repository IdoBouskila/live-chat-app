import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getFirstLetter } from '../helpers';
import useMessages from '../hooks/useMessages';
import { useChat } from '../context/ChatProvider';

const ConversationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1vh;
    flex: 1;
    padding: 20px 0;
    overflow: auto;
`;

const MessageContent = styled.div`
    display: flex;
    font-size: 0.8em;
    font-weight: 300;
    padding: 0.8em 1em;
    width: fit-content;
    height: fit-content;
`;

const MessageContainer = styled.div`
    display: flex;
    gap: 20px;
    color: #fff;
    font-size: 1rem;
    flex-direction: ${ props => props.incomingMessage ? 'row' : 'row-reverse' };

    ${ MessageContent } {
        background: ${ props => props.incomingMessage ? 'var(--blue-gradient)' : '#fff' };
        border: ${ props => props.incomingMessage ? 'none' : '1px solid rgba(0, 0, 0, 0.1)' };
        color: ${ props => props.incomingMessage ? '#fff' : '#000' };
        box-shadow:  ${ props => props.incomingMessage ? 'rgba(32, 112, 198, 0.4)' : 'rgba(0, 0, 0, 0.15)'} 2px 3px 15px;
        border-radius: ${ props => props.incomingMessage ? '0 8px 8px 8px' : '8px 0 8px 8px' };
    }
`;

const UserProfile = styled.div`
    display: flex;
    position: relative;
    height: 100%;

    &::before {
        content: '${props => getFirstLetter(props.content) }';
        display: grid;
        place-content: center;
        padding: 0.5em;
        width: 1.3em;
        height: 1.3em;
        border-radius: 50%;
        background: var(--secondry-color-dark-palette);
    }
`
const BotMessage = styled.div`
    width: fit-content;
    margin: 0 auto;
    padding: 0.85em 1.7em;
    font-size: 0.7em;
    text-align: center;
    border-radius: 2em;
    background: rgba(0,0,0,0.05);
`;

const Conversation = () => {
    const { socket } = useChat();
    const messages = useMessages();
    const chatConversation = useRef(null);
    
    // auto scroll to bottom on new message recieve / sent
    useEffect(() => {
        chatConversation.current.scrollTo(0, chatConversation.current.offsetHeight)    
    }, [messages]);

    return (
        <ConversationContainer ref={ chatConversation }>
            {
                messages.map((m) => {
                    const { text, author, socket_id, id } = m;

                    const isBot = (author === 'BOT' && ! socket_id);
                    
                    return isBot ?
                        <BotMessage> { text } </BotMessage>
                    :
                    (
                        <MessageContainer key={ id } incomingMessage={ socket_id !== socket.id }>
                            <UserProfile content={ author } />
                            <MessageContent>{ text }</MessageContent>
                        </MessageContainer>
                    );
                })
            }
        </ConversationContainer>
    );
};

export default Conversation;