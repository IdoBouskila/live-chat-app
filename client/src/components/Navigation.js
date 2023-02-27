import React from 'react';
import { GiExitDoor } from "react-icons/gi"
import { AiFillHome, AiFillWechat } from "react-icons/ai"
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
    padding: 6vh 5px;
    background: #1a1a1a;
    
    & div {
        justify-content: center;
        width: 100%;
    }

    @media (max-width: 820px) {
        width: 100%;
        height: 5%;
        flex-direction: row;
    }
`;

const Navigation = ({ openRoomNav }) => {
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
                        <AiFillHome size='100%' />
                    </a>
            </ButtonContainer>


            <ButtonContainer device='mobile' onClick={ openRoomNav }>
                <a href='#'>
                    <AiFillWechat size='100%' />
                </a>
            </ButtonContainer>
    

            <ButtonContainer onClick={ leaveClickHandler }>
                    <a href="#">
                        <GiExitDoor size='100%' />
                    </a>
            </ButtonContainer>

        </Nav>
    );
};

export default Navigation;