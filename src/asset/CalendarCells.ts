import styled from "styled-components";

export const CellWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    margin-bottom : 50px;
`;
export const CellTop = styled.div`
    width : 100%;
    height : 20%;
`;

export const AddSchedule = styled.div<{ isHover: boolean}>`
    display : ${(props)=> props.isHover ? 'block' : 'none' };
    width : 50%;
    float: left;
    padding : 2%;
    button {
        color: rgba(55, 53, 47, 0.45);
        cursor: pointer;
        background-color: white;
        border-radius: 3px;
        border: 1px solid rgb(233, 233, 231);
        box-shadow: 0px 2px 4px rgba(15, 15, 15, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        padding : 4%;
        &:hover{
            background-color: rgb(233, 233, 231);
        }
    }
`;

export const Cell = styled.div<{cellbg:boolean}>`
    width: calc(14% - 1px);
    flex: 1 0 auto;
    height : 140px;
    box-sizing: border-box;
    border: 1px solid rgb(233, 233, 231);
    background-color: ${(props) => props.cellbg ? 'white' : 'rgb(251, 251, 250)'};
`;

export const Day = styled.div<{cellColor:boolean}>`
    width : 50%;
    float: right;
    padding : 3%;
    text-align: right;
    font-weight: 350;
    font-size: 14px;
    color : ${(props) => props.cellColor ? 'rgb(55,53,48)' : 'rgba(55, 53, 47, 0.5);'};
`;