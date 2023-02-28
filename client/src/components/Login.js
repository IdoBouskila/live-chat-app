import React, { useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useChat } from '../context/ChatProvider';

const LoginContainer = styled.form`
    display: flex;
    gap: 10px;
    align-items: center;
    background: #fff;
    padding: 15px 20px;
    border-radius: 100px;
    width: clamp(210px, 18vw, 20%);
    
    & button {
        display: flex;
        padding: 10px 20px;
        border: none;
        border-radius: 100px;
        background: var(--blue-active-color);
        transition: .3s ease-in-out opacity, box-shadow;
        cursor: pointer;

        &:hover {
            opacity: 0.85;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }

    }
`;

const Input = styled.input.attrs(props => ({
        type: 'text'
    }))`

    width: 100%;
    border: none;
    background: transparent;
    color: #424242;

    &::placeholder {
        color: #7b7b7b;
        font-size: 1em;
    }

    @media (max-width: 820px) {
        font-size: 0.7em;
    }
`;

const Login = () => {
    const inputRef = useRef(null);
    const { setUserName } = useChat();

    function handleSubmit(e) {
        e.preventDefault();
        
        setUserName(inputRef.current.value);
    }

    return (
        <LoginContainer onSubmit={ handleSubmit }>
            <Input type="text" placeholder="Enter a username" ref={ inputRef } />
            
            <button>
                <AiOutlineArrowRight color='#fff' size="1.2em" />
            </button>
        </LoginContainer>
    );
};

export default Login;