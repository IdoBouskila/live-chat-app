import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import ChatContainer from './components/ChatContainer';
import { SocketProvider } from './context/SocketProvider';

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color-dark-palette: #1a1a1a;
    --secondry-color-dark-palette: #373737;
    --blue-button-color: #3c95f4;
    --blue-active-color: #2070c6;
    --blue-gradient: linear-gradient(90deg, #3c95f4 65%, #3385dc 100%);
  }

  * {
    margin: 0;
    padding: 0;
    outline: transparent;
    text-decoration: none;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: var(--blue-gradient);
  }
`;

const Background = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
overflow: hidden;
z-index: -1;

&::before, &::after {
    content: '';
    position: absolute;
    inset: -170px auto auto -200px;
    width: clamp(30vw, 600px, 42vw);
    height: clamp(30vw, 600px, 42vw);
    border-radius: 50%;
    background: #1e6dbf;
    z-index: -1;
  }

  &::after {
    inset: auto -170px -200px auto;
  }
`;

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;

function App() {
  const [userName, setUserName] = useState('');

  return (
    <SocketProvider>
      <GlobalStyle />

      <Background />
      
      <Wrapper>
        {
          ! userName
          ?
            <Login setUserName={ setUserName }/>
          :
            <ChatContainer userName={ userName } />
        }
      </Wrapper>
    </SocketProvider>
  );
}

export default App;
