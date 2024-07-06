import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    line-height: 100%;
    float: right;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 350;

    .react-datepicker__input-container input{
        padding : 0 2%;
        border-radius: 5px;
    }
    .react-datepicker__input-container input:hover{
        background-color: rgb(55, 53, 47, 0.08);
    }

    .react-datepicker-wrapper{
        width : 100%;
        height: 100%;
        float: right;
        cursor: pointer;
        .react-datepicker__input-container{
            width : 100%;
            height: 100%;
            input {
                height : 100%;
                background-color: none;
                border : none;
                width : 100%;
                cursor: pointer;
                &:focus{
                    outline: none;
                }
            }
        }

    }

    .react-datepicker__header{
        background-color: white;
    }
    .react-datepicker-popper{
        transform: translate(260.5px, 210.5px) !important;
    }

    .react-datepicker__day--selected{
        background: #eb5757;
    border-radius: 100%;
    }
`

export const DatePrickerHeader = styled.div`
    padding : 0 3%;
    padding-bottom : 8%;
    border-bottom : 1px solid rgb(186, 186, 186);
    .endDateToggleWrapper{
       height: 25px;
       line-height: 25px;
       display: block;
        div:nth-child(1){
            width : 50%;
            float: left;
            text-align: left;
        }
        div:nth-child(2){
            width : 50%;
            float: right;
            text-align: right;

            input {
                appearance: none;
                position: relative;
                border: max(1px, 0.1em) solid gray;
                border-radius: 1.25em;
                width: 2.25em;
                height: 1.25em;
            }

            input::before {
                content: "";
                position: absolute;
                left: 0;
                width: 1em;
                height: 1em;
                border-radius: 50%;
                transform: scale(0.8);
                background-color: gray;
                transition: left 250ms linear;
            }

            input:checked::before {
            background-color: white;
            left: 1em;
            }

            input:checked {
            background-color: rgb(63, 132, 219);
            border-color: rgb(63, 132, 219);
            }
        }
    }

`;

export const ShowDate = styled.div`
    text-align: left;
    height: 25px;
    line-height: 25px;
    padding : 0px;
    width : 250px;

    input{
        height: 100%;
        border : 1px solid rgb(223, 223, 221);
        background-color: rgb(247, 247, 245);
        box-sizing: border-box;
        border-radius: 5px;
        padding : 0 2%;
        
    }

`;