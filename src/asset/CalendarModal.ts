import styled from "styled-components";
import { motion } from "framer-motion";

export const CalendarModalWrapper = styled(motion.form)`
    position: absolute;
    width : 50vw;
    height : 80vh;
    left : 0;
    right : 0;
    margin : 0 auto;
    border-radius : 15px;
    overflow : hidden;
    background-color : white;
    box-shadow: rgba(15, 15, 15, 0.04) 0px 0px 0px 1px,
                rgba(15, 15, 15, 0.03) 0px 3px 6px,
                rgba(15, 15, 15, 0.06) 0px 9px 24px;
    padding : 5%;
`;

export const ModalTop = styled.div<{ isError: boolean}>`
    width : 100%;
    height: 13%;

    input{
        width : 100%;
        height : 100%;
        border : ${(props)=> props.isError ? "2px solid red" : "none"};
        border-radius: 5px;
        max-width: 100%;
        white-space: pre-wrap;
        word-break: break-word;
        padding: 3px 2px;
        font-size: 2em;
        font-weight: 500;
        margin: 0px;
        min-height: 1em;

        &:focus{
            outline : none;
        }
        &::placeholder{
            color: rgba(55, 53, 47, 0.15);
        }
    }
`;

export const ModalDate = styled.div`
    width : 100%;
    height: 6%;
    
    div{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 350;
    }
    .title{
        svg{
            padding : 1px;
            margin-right : 3%;
            color : rgba(55, 53, 47, 0.45);
        }
        color : rgba(55, 53, 47, 0.65);
        width : 25%;
        height: 100%;
        float: left;
    }
    .contents{
        padding : 0 2%;
        width : 75%;
        height: 100%;
        float: right;
        cursor: pointer;
        &:hover{
            background-color: rgb(55, 53, 47, 0.08);
            border-radius: 5px;
        }
    }
`;

export const ModalTag = styled.div`
    width : 100%;
    height: 6%;

    div{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 350;
    }
    .title{
        svg{
            padding : 1px;
            margin-right : 3%;
            color : rgba(55, 53, 47, 0.45);
        }
        color : rgba(55, 53, 47, 0.65);
        width : 25%;
        height: 100%;
        float: left;
    }
    .contents{
        padding : 0 2%;
        width : 75%;
        height: 100%;
        float: right;
        cursor: pointer;
        .empty-tag-wrapper{
            color : rgb(155,154,151);
        }
        &:hover{
            background-color: rgb(55, 53, 47, 0.08);
            border-radius: 5px;
        }
    }
`;

export const CreateTagWrapper = styled.div`
    z-index: 1;
    width : 100%;
    height : 80px;
    border-radius: 5px;
    flex-direction: column;
    align-self: stretch;
  
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
                rgba(15, 15, 15, 0.1) 0px 3px 6px,
                rgba(15, 15, 15, 0.2) 0px 9px 24px;
    input {
        
        box-shadow: rgba(55, 53, 47, 0.16) 0px -1px inset;
        border : none;
        outline: none;
        width : 100%;
        height: 100%;
        border-radius: 5px;
        background-color: rgb(247,247,245);
        padding : 0 2%;
    }
    div{
        width : 100%;
        height: 100%; 
    }
`;

export const ModalContents = styled.div<{isError:boolean}>`
    width : 100%;
    height: 52%;
    border-top : 1px solid rgba(55, 53, 47, 0.15);
    margin-top : 3%;

    textarea{
        border : ${(props)=> props.isError ? "2px solid red" : "none"};
        border-radius: 5px;
        width : 100%;
        height : 100%;
        resize: none;
        padding : 2% 0;
        font-size: 16px;
        &:focus{
            outline: none;
        }
        &::placeholder{
            color: rgba(55, 53, 47, 0.15);
            font-weight: 500;
        }
    }
`;

export const ModalSubmit = styled.div`
    width : 100%;
    height: 10%;

    button{
        margin-top : 3%;
        width : 10%;
        height : 60%;
        margin-left : 2%;
        float: right;
        border-radius: 5px;
        font-size: 14px;
        /* box-shadow: 0px 2px 4px rgba(15, 15, 15, 0.1); */
        cursor: pointer;
    }

    .cancel-button{
        border : 1px solid rgba(55, 53, 47, 0.45);
        background-color: white;
        &:hover{
            background-color: rgb(55, 53, 47, 0.08);
        }
    }

    .submit-button{
        border : none;
        background-color: rgb(233,87,72, 1);
        color : white;
        &:hover{
            background-color: rgb(220,87,72);
        }
    }

`;


export const Overley = styled(motion.div)`
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background-color : rgba(0,0,0,0.5);
    opacity : 0;
`;

export const ErrorMessage = styled.div`
    color : red;
    font-size: 12px;
    font-weight: 400;
    padding : 1% 0;
`;