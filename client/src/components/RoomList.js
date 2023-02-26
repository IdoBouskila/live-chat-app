import React, { useMemo } from 'react';
import styled from 'styled-components';
import useChatActions from '../hooks/useChatActions';
import useDebounce from '../hooks/useDebounce';

const RoomListContainer = styled.div`
    --space: 1em;
    --horizontal-space: 2vw;
    
    display: flex;
    flex-direction: column;
    width: 26%;
    height: 100%;
    padding-top: var(--vertical-padding);
    overflow: auto;
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    background: var( --blue-gradient);
    color: #fff;
    
    & h3 {
        font-size: 1.2em;
        font-weight: 500;
        padding: 0.9em var(--horizontal-space);
    }
`;

const RoomItem = styled.li`
    display: flex;
    gap: 1vw;
    width: 100%;
    flex: 1;
    padding: var(--space) var(--horizontal-space);
    list-style: none;
    background: ${ props => props.active ?  'var(--blue-active-color)' : 'transparent'};
    cursor: pointer;
    transition: all .05s;

    &:hover {
        background: var(--blue-active-color);
    }

    & img {
        height: 3vw;
        width: 3vw;
        border-radius: 20px;
        object-fit: cover;
    }

    & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    & span {
        font-weight: 500;
        font-size: 0.8em;
    }

    & p {
        display: -webkit-box;
        font-size: 0.7em;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(254, 254, 254, 0.5);
    }
`;

const RoomList = ({ rooms, query, currentRoom, setCurrentRoom, userName }) => {
    const debouncedSearch = useDebounce(query, 350);
    const { joinRoom } = useChatActions();

    const filteredRooms = useMemo(() => {
        const filter = rooms.filter(room => {
            const includesCaseInsensitive  = {
                name: room.name.toLowerCase(),
                description: room.description.toLowerCase()
            };
    
            const { name, description } = includesCaseInsensitive;
    
            return name.includes(debouncedSearch.toLowerCase()) || description.includes(debouncedSearch.toLowerCase());
        });

        return filter;
    }, [rooms, debouncedSearch])

    const handleRoomClick = (roomID) => {
        if(currentRoom?.id === roomID) {
            return;
        }

        const selectedRoom = rooms.find(room => room.id === roomID);
        setCurrentRoom(selectedRoom);

        joinRoom({ roomID, userName });
    }
    

    return (
        <RoomListContainer>
            <h3>Rooms</h3>

            <ul>
                {   
                    
                    filteredRooms.map(room => {
                        const { id, name, src, description} = room;

                        return <RoomItem active={ currentRoom?.id === id } key={ id } onClick={ () => handleRoomClick(id) }>
                            <img alt='room-img' src={ src } />

                            <div>
                                <span>{ name }</span>
                                <p>{ description }</p>
                            </div>
                        </RoomItem>
                    })
                }
            </ul>
        </RoomListContainer>
    );
};

export default RoomList;