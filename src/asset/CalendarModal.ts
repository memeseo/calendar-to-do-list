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

export const ModalTop = styled.div<{ $isError: boolean}>`
    width : 100%;
    height: 13%;

    input{
        width : 100%;
        height : 100%;
        border : ${(props)=> props.$isError ? "2px solid red" : "none"};
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

export const ModalTag = styled.div<{ $isTagInput: boolean}>`
    width : 100%;
    height: 6%;

    .title{
        svg{
            padding : 1px;
            margin-right : 3%;
            color : rgba(55, 53, 47, 0.45);
        }
        align-items: center;
        font-size: 14px;
        font-weight: 350;
        display: inline-flex; 
        color : rgba(55, 53, 47, 0.65);
        width : 25%;
        height: 100%;
        float: left;
    }

    .contents{
        align-items: center;
        font-size: 14px;
        font-weight: 350;
        display: inline-flex; 
        padding : 0 2%;
        width : 75%;
        height: 100%;
        float: right;
        cursor: ${(props)=> props.$isTagInput ? 'auto' : 'pointer'};
        .show-tag-wrapper{
            width : 100%;
            color : rgb(155,154,151);
        }
        &:hover{
            background-color: ${(props)=> props.$isTagInput ? 'none' : 'rgb(55, 53, 47, 0.08)'};
            border-radius: 5px;
        }
    }
`;

export const TagNameWrapper = styled.span<{ color: string}>`
    display: inline-block;
    font-size: 12px;
    line-height: 100%;
    background-color: ${(props)=> `rgb(${props.color})`};
    padding : 1%;
    border-radius: 3px;
    /* height : 85%; */
    color : black;
`;

export const TagOutline = styled.div<{$isError: boolean}>`
    border : ${(props)=> props.$isError && "2px solid red"};
    border-radius: 5px;
    font-size: 12px;
    margin-bottom :  ${(props)=> props.$isError && "1%"};
`;


export const CreateTagWrapper = styled.div`
    position: fixed;
    top: 34%;
    width: 30%;
    z-index: 1;
    height : auto;
    border-radius: 5px;
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
                rgba(15, 15, 15, 0.1) 0px 3px 6px,
                rgba(15, 15, 15, 0.2) 0px 9px 24px;
    background-color: rgb(247,247,245);
    
    .tag-input-wrapper{
        width : 100%;
        display: flex;
        padding : 0 2%;
        height: 30px;
        input {
            box-shadow: rgba(55, 53, 47, 0.16) 0px -1px inset;
            border : none;
            outline: none;
            width : 100%;
            height: 100%;
            border-radius: 5px, 0px, 5px, 0px;
            background-color: rgb(247,247,245);
            padding : 0 2%;
            &::placeholder{
                color: rgba(55, 53, 47, 0.5);
            }
        }
    }

`;


export const SelectdTagWapper = styled.div<{color: string}>`
    display : flex;
    line-height: 100%;
    height: 100%;
    background-color: ${(props)=> `rgb(${props.color})`};
    border-radius: 3px;
    height : 70%;
    padding : 1% 2% 1% 2%;
    width : auto;
    .selected-tag{
        width : 100%;
        font-size: 12px;
    }
    svg{   
        margin-left : 3px;
        color : grey;
        cursor: pointer;
    }
`;

export const TagList = styled.div`
    z-index: 2;
    display: block;
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
                rgba(15, 15, 15, 0.1) 0px 3px 6px,
                rgba(15, 15, 15, 0.2) 0px 9px 24px;
    border-end-start-radius: 5px;
    border-bottom-right-radius: 5px;
    width : 100%;
    min-height : 100%;
    max-height: 300px;
    overflow-y : auto;
    background-color: white;
    padding : 0 1%;
`;

export const TagWrapper = styled.div<{color:string}>`
        border-radius: 5px;
        height : 28px;
        padding : 0 2%;
        margin : 3px 0;
        display:flex;
        align-items:center;
        &:hover {
            cursor: pointer;
            background: rgba(55, 53, 47, 0.05);
        }
        .tagName{
            span{
                display: inline-block;
                font-size: 12px;
                line-height: 100%;
                height: 100%;
                background-color: ${(props)=> `rgb(${props.color})`};
                padding : 0 2%;
                padding-top : 1%;
                border-radius: 3px;
                height : 85%;
            }
            padding-top : 1%;
            height: 100%;
            width : 95%;
            float: left;
        }
        svg{
            width : 5%;
            float: right;
            font-size: 20px;
            color: rgba(55, 53, 47, 0.45);
        }
`

export const ModalContents = styled.div<{$isError:boolean}>`
    width : 100%;
    height: 52%;
    border-top : 1px solid rgba(55, 53, 47, 0.15);
    margin-top : 5%;

    textarea{
        border : ${(props)=> props.$isError ? "2px solid red" : "none"};
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

export const ErrorMessage = styled.div<{isTagEmptyError:boolean}>`
    color : red;
    font-size: 12px;
    font-weight: 400;
    padding : 1% 0;
    padding-left : ${(props)=> props.isTagEmptyError && `25%`}
    
`;