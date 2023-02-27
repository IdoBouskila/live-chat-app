import React from 'react';
import { ImExit } from "react-icons/im"
import { AiFillHome } from "react-icons/ai"
import styled from 'styled-components';
import { ButtonContainer } from '../styled/Button';
import useChatActions from '../hooks/useChatActions';
import { useChat } from '../context/ChatProvider';

const Nav = styled.nav`
    display: flex;
    width: 7%;
    gap: 20px;
    align-items: center;
    flex-direction: column;
    padding: 6vh 0;
    background: #1a1a1a;
`;

const Navigation = () => {
    const { leaveRoom } = useChatActions();
    const { currentRoom, setCurrentRoom } = useChat();

    const leaveClickHandler = () => {
        setCurrentRoom(null);
        leaveRoom(currentRoom.id);
    }

    return (
        <Nav>
            <ButtonContainer active={ true }>
                    <a href="#">
                        <AiFillHome size={ '73%' } style={{ fill: '#fff' }} />
                    </a>
            </ButtonContainer>
    

            <ButtonContainer onClick={ leaveClickHandler }>
                    <a href="#">
                        <ImExit size={ '73%' } style={{ fill: '#737373' }}/>
                    </a>
            </ButtonContainer>

        </Nav>
    );
};

export default Navigation;