
import { AnimatePresence, useViewportScroll} from "framer-motion";
import { format} from 'date-fns';
import { useForm } from 'react-hook-form';
import {CalendarModalWrapper, Overley, ModalTop, ModalDate, ModalTag, ModalContents, ModalSubmit, ErrorMessage, CreateTagWrapper, TagList} from 'asset/CalendarModal';
import { FaCalendarDays } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { CalenderCell } from 'model/CalendarCell';
import { useState } from "react";
import { Tag } from "./CelendarTag";

interface Props {
    isModalOpen : boolean;
    onOverlayClick(): void;
    selectedDate : CalenderCell | null;
}

interface IForm {
    title: string;
    contents: string;
  }


export const CalendarModal = ({isModalOpen, onOverlayClick, selectedDate} : Props) => {
    const { scrollY } = useViewportScroll();
    const { register, handleSubmit, formState: { errors }} = useForm<IForm>();
    const [isTagInput, setTagInput] = useState(false);

    const onValid = (data:IForm) => {
        
        
        console.log('data ', data);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if(isTagInput) {
            event.preventDefault();
        };
        
        handleSubmit(onValid)
    }

    const setTagInputState = (event: React.MouseEvent<HTMLElement>) => {
        const className = (event.target as HTMLDivElement).className;
        const classList = (event.target as HTMLDivElement).classList;
        console.log('Class name:', className);
        console.log('Class name:', classList, ' / ', classList.contains(className));
        
        ['empty-tag-wrapper', 'submit-button'].includes(className) ? setTagInput(true) : setTagInput(false);
    }

    const createTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if(event.key === "Enter") {
            console.log('!!!!!!!!!')
        } 
    }

    return (
        <>
            <AnimatePresence>
                {isModalOpen ? (
                    <>
                        <Overley 
                            onClick={onOverlayClick}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}/>

                        <CalendarModalWrapper
                            onClick={setTagInputState}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ top: scrollY.get() + 100 }}
                            onSubmit={handleSubmit(onValid)}
                        >
                            <ModalTop isError={errors.hasOwnProperty("title")}>
                                <input {...register("title", {required : "제목은 필수 입력값 입니다.", maxLength : {value : 30, message : "30자 이하로 입력해 주세요."}})} type="text" placeholder='제목을 입력해 주세요.'></input>
                            </ModalTop>
                            {
                                errors.hasOwnProperty("title") ?
                                    <ErrorMessage>
                                        * {errors?.title?.message}
                                    </ErrorMessage> 
                                    : null
                            }
                            <ModalDate>
                                <div className="title">
                                    <FaCalendarDays/> 달력
                                </div>
                                <div className="contents">{selectedDate ? format(selectedDate.startDate, 'yyyy M월 d일') : null}</div>
                            </ModalDate>
                            <ModalTag isTagInput={isTagInput}>
                                <div className="title">
                                    <FaHashtag/> 태그
                                </div>
                                <div className="contents tag-input">
                                    {
                                        !isTagInput ? <div className="empty-tag-wrapper" onClick={setTagInputState}>비어 있음</div> : (
                                            <CreateTagWrapper>
                                                <input placeholder="태그를 선택하거나 생성해 주세요."
                                                    onClick={(event) => event.stopPropagation()}
                                                    onKeyDown={createTag}></input>
                                                <TagList >
                                                    <Tag/>
                                                </TagList>
                                            </CreateTagWrapper>
                                            
                                        )
                                    }
                                    
                                </div>
                            </ModalTag>
                            <ModalContents isError={errors.hasOwnProperty("contents")}>
                                <textarea placeholder="내용을 입력해 주세요." {...register("contents", { maxLength : {value : 300, message : "300자 이하로 입력해 주세요."} })}></textarea>
                            </ModalContents>
                            {
                                errors.hasOwnProperty("contents") ?
                                    <ErrorMessage>
                                        * {errors?.contents?.message}
                                    </ErrorMessage> 
                                    : null
                            }
                            <ModalSubmit>
                                <button className="submit-button">등록</button>
                                <button className="cancel-button" onClick={onOverlayClick}>취소</button>
                            </ModalSubmit>
                        </CalendarModalWrapper>
                    </>)  : null
                }

            </AnimatePresence>
        </>
    )
}