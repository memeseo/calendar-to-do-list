import styled from "styled-components";

export const HeaderWrapper = styled.div`
    width : 100%;
    height : 35px;
    div{
        height : 100%;
    }
    div:nth-child(1){
        width : 50%;
        box-sizing : border-box;
        border : 1px solid red;
        float : left;
    }
    div:nth-child(2){
        width : 50%;
        box-sizing : border-box;
        border : 1px solid red;
        float : right;
        text-align: right;
    }
`;