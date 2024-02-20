
import { AnimatePresence, useViewportScroll} from "framer-motion";
import { format} from 'date-fns';
import { useForm } from 'react-hook-form';
import {CalendarModalWrapper, Overley, ModalTop, ModalDate, ModalTag, ModalContents, ModalSubmit, ErrorMessage} from 'asset/CalendarModal';
import { FaCalendarDays } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { CalenderCell } from 'model/CalendarCell';

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

    const onValid = (data:IForm) => {
        console.log('data ', data);
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
                            <ModalTag>
                                <div className="title">
                                    <FaHashtag/> 태그
                                </div>
                                <div className="contents"></div>
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