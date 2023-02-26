import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getFirstLetter } from '../utiles/helpers';
import useMessages from '../hooks/useMessages';
import useChatActions from '../hooks/useChatActions';

const ConversationContainer = styled.div`
    flex: 1;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    gap: 1vh;
    overflow: auto;
`;

const MessageContent = styled.div`
    display: flex;
    font-size: 0.8em;
    font-weight: 300;
    padding: 0.8em 1em;
    width: fit-content;
    height: fit-content;
    word-break: break-all;
    border-radius: 8px;
    border-top-left-radius: 0;
`;

const MessageContainer = styled.div`
    display: flex;
    gap: 20px;
    color: #fff;
    font-size: 1rem;
    /* overflow: hidden; */
    height: 5.2vh;
    flex-direction: ${ props => props.incomingMessage ? 'row' : 'row-reverse' };

    ${ MessageContent } {
        background: ${ props => props.incomingMessage ? 'var(--blue-gradient)' : '#fff' };
        border: ${ props => props.incomingMessage ? 'none' : '1px solid rgba(0, 0, 0, 0.1)' };
        color: ${ props => props.incomingMessage ? '#fff' : '#000' };
        box-shadow:  ${ props => props.incomingMessage ? 'rgba(32, 112, 198, 0.4)' : 'rgba(0, 0, 0, 0.15)'} 2px 3px 15px;
    }
`;

const UserProfile = styled.div`
    display: flex;
    position: relative;
    height: 100%;

    &::before {
        content: '${props => props.content}';
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
    padding: 0.5vw 1vw;
    font-size: 0.7em;
    text-align: center;
    border-radius: 2em;
    background: rgba(0,0,0,0.05);
`;

const Conversation = ({ currentRoom }) => {
    const chatConversation = useRef(null);
    const messages = useMessages(currentRoom);
    const { socketID } = useChatActions();
    
    // auto scroll to bottom on new message recieve / sent
    useEffect(() => {
        chatConversation.current.scrollTo(0, chatConversation.current.offsetHeight)    
    }, [messages])

    return (
        <ConversationContainer ref={ chatConversation }>
            {
                messages.map((m) => {
                    const { text, author, socket_id} = m;

                    const isBot = (author === 'BOT' && ! socket_id);
                    
                    return isBot ? 
                        <BotMessage> { text } </BotMessage>
                    :
                    (
                        <MessageContainer incomingMessage={ socket_id !== socketID() }>
                            <UserProfile content={ getFirstLetter(author) } />
                            <MessageContent>{ text }</MessageContent>
                        </MessageContainer>
                    );
                })
            }
        </ConversationContainer>
    );
};

export default Conversation;