import styled from "styled-components";

export const HeaderWrapper = styled.div`
    width : 100%;
    height : 35px;
 
    div{
        height : 100%;
        line-height: 100%;
    }
`;

export const DateWrapper = styled.div`
    width : 50%;
    box-sizing : border-box;
    float : left;
    font-weight: 500;
    letter-spacing: 1px;
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const DataButtonWrapper = styled.div`
    width : 50%;
    box-sizing : border-box;
    float : right;
    display: flex;
    justify-content: right;
    align-items: center;
    svg {
        cursor: pointer;
        height: 100%;
        color : rgba(165,164,162, 0.8);
        &:hover {
            border-radius: 5px;
            background-color : rgba(239, 239,239, 1); 
        }
    }

    button {
        cursor: pointer;
        border: 0;
        background-color: white;
        height: 100%;
        &:hover{
            border-radius: 5px;
            background-color : rgba(239, 239,239, 1); 
        }
        
    }
`;