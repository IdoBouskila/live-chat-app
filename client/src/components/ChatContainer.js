import React, { useState } from 'react';
import styled from 'styled-components';
import RoomList from './RoomList';
import ChatForm from './ChatForm';
import Conversation from './Conversation';
import Navigation from './Navigation';
import SearchRooms from './SearchRooms';

const ChatAppContainer = styled.div`
    --vertical-padding: 3vh;

    display: flex;
    gap: 2vw;
    height: 80vh;
    width: 80vw;
    justify-content: space-between;
    background: #e5e7e8;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
                rgba(0, 0, 0, 0.12) 0px -12px 30px,
                rgba(0, 0, 0, 0.12) 0px 4px 6px,
                rgba(0, 0, 0, 0.17) 0px 12px 13px,
                rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const CenterContainer = styled.div`
    display: flex;
    flex: 1;
    gap: 1.5vw;
    flex-direction: column;
    height: 100%;
    margin: auto 0;
    padding: 3vw 1vw;
    
`;

const Chat = styled.div`
    padding: var(--vertical-padding) var(--vertical-padding) 1.5vh var(--vertical-padding);
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 80%;
    background: #fff;
    border-radius: 30px;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 1.1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding-bottom: 1em;
    height: 3.2em;
    
    & img {
        height: 100%;
        border-radius: 0.7em;
    }

    & h2 {
        font-size: 0.85em;
        font-weight: 600;
    }
    & p {
        font-size: 0.75em;
    }
`;

const WelcomeMessage = styled.p`
    margin: auto 0;
    font-size: 0.9em;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
`;

// Static rooms in the chat
const rooms = [
    {
        id: 1,
        name: 'Dog Lovers 🐶',
        src: 'https://www.willmarlakesarea.com/wp-content/uploads/2019/11/December-Blog-Dog-Friendly-Community-dog-park.jpg',
        description: 'A community for dog lovers to share information, photos, experiences, and support each other.'
    },

    {
        id: 2,
        name: 'Developers 💻',
        src: 'https://www.redlasso.com/wp-content/uploads/2020/03/Visual-Studio-Code-Vs-Community.jpg',
        description: 'Community for developers, we help each other.'
    },
    
    {
        id: 3,
        name: 'Foodies 🍕',
        src: 'https://miro.medium.com/max/1400/0*PjchgA6hmUjQcF6g.png',
        description: 'A community of people who have a passion for food and love to explore new culinary experiences.'
    },

    {
        id: 4,
        name: 'Bookworms 📚',
        src: 'https://bookwormreads.co/og_img.png',
        description: 'Those who love to read and immerse themselves in books, and often discuss and share their favorite stories with others'
    },

    {
        id: 5,
        name: 'Movie Buffs 🎬',
        src: 'https://www.parkgrandkensington.co.uk/blog/wp-content/uploads/2019/10/watching-cinema-1280x720.jpg',
        description: 'A group of individuals who love to engage in outdoor activities such as hiking, camping, and rock climbing'
    },

    {
        id: 6,
        name: 'DIYers 🙌',
        src: 'https://d9e8c7w7.stackpathcdn.com/wp-content/uploads/2020/04/DIY-During-Lockdown.jpg',
        description: ' People who like to take on home improvement and craft projects, and enjoy working with their hands to create something new and unique'
    },

    {
        id: 7,
        name: 'Fitness Enthusiasts 💪🏽',
        src: 'https://assets.website-files.com/581c85345d7e0501760aa7db/5b17ab5cc6215ef0331908fd_Creative%20Ways%20to%20Build%20Community%20at%20Your%20Gym.jpg',
        description: 'Individuals who have a love for films and enjoy watching and discussing different genres, styles, and storylines.'
    }
];

const ChatContainer = ({ userName }) => {
    const [currentRoom, setCurrentRoom] = useState(null);
    const [query, setQuery] = useState('');

    return (
        <ChatAppContainer>
            <Navigation />

            <CenterContainer>
                <SearchRooms query={ query } setQuery={ setQuery } />

                <Chat>
                    {
                        ! currentRoom ? 
                        
                        <WelcomeMessage>Come join the fun! <br/> Chat with friends or meet new ones in one of our lively chat rooms.<br/> See you there! 🙋🏽‍♂️</WelcomeMessage>
                        :
                        <>
                            <Header>
                                <img alt='room-img' src={ currentRoom.src } />

                                <div>
                                    <h2>{ currentRoom.name }</h2>
                                    <p>{ currentRoom.description }</p>
                                </div>
                            </Header>
                            
                            <Conversation
                                currentRoom={ currentRoom }
                            />
            
                            <ChatForm
                                userName={ userName }
                                currentRoom={ currentRoom } 
                            />
                        </>

                    }
                </Chat>
            </CenterContainer>

            <RoomList
                rooms={ rooms }
                query= { query }
                currentRoom={ currentRoom }
                setCurrentRoom={ setCurrentRoom }
                userName={ userName }
            />
        </ChatAppContainer>
    );
};

export default ChatContainer;