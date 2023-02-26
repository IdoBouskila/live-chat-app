import React from 'react';
import { ImExit } from "react-icons/im"
import { AiFillHome } from "react-icons/ai"
import styled from 'styled-components';
import { ButtonContainer } from '../styled/Button';

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
    return (
        <Nav>
            <ButtonContainer active={ true }>
                    <a href="#">
                        <AiFillHome size={ '73%' } style={{ fill: '#fff' }} />
                    </a>
            </ButtonContainer>
    

            <ButtonContainer>
                    <a href="#">
                        <ImExit size={ '73%' } style={{ fill: '#737373' }}/>
                    </a>
            </ButtonContainer>

        </Nav>
    );
};

export default Navigation;