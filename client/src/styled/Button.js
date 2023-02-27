import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: flex;
    flex: ${ props => props.flex ? props.flex : '1'};
    align-items: flex-end;

    & a, button { 
        display: grid;
        place-items: center;
        padding: ${ props => props.padding ? props.padding : '0.82vw'};
        width: ${ props => props.size ? props.size : '3.3vw'};
        height: ${ props => props.size ? props.size : '3.3vw'};
        border: none;
        border-radius: ${ props => props.borderRadius ? props.borderRadius : '1.2vw'};
        background: ${ props => props.active ? 'var(--blue-active-color)' : 'var(--secondry-color-dark-palette)' };
        box-shadow: ${ props => props.active ? 'rgba(32, 112, 198, 0.7) 0 0 10px' : 0 };
        transition: .3s ease-in-out all;
        cursor: pointer;
    }
    
    & svg {
        transition: .3s ease-in-out all;
    }
    
    & button:hover, a:hover {
        background: var(--blue-active-color);
        box-shadow: rgba(32, 112, 198, 0.7) 0 0 10px;
        opacity: 0.8;
    }

    & a:hover svg {
        fill: #fff !important;
    }
`;