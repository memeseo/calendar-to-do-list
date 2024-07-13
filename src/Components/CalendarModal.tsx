
import { AnimatePresence } from "framer-motion";
import { format, eachDayOfInterval } from 'date-fns';
import { useForm } from 'react-hook-form';
import {CalendarModalWrapper, Overley, ModalTop, ModalDate, ModalTag, ModalContents, ModalSubmit,
        ErrorMessage, CreateTagWrapper, TagList, SelectdTagWapper, TagNameWrapper, TagOutline} from 'asset/CalendarModal';
import { FaCalendarDays } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { CellObject } from 'model/Cell';
import { useEffect, useState } from "react";
import { CelendarTag } from "Components/CelendarTag";
import { Tag } from 'model/Tag';
import { ScheduleObject } from "model/Schedule";
import { IoCloseSharp } from "react-icons/io5";
import { addSchedule, setSchedule, deleteScheduleByid } from 'apis/ScheduleApi';
import { addTag } from 'apis/TagApi';
import { useSelector } from 'react-redux';
import store, { RootState } from 'reducer/index';
import { addToTags } from 'reducer/tag';
import { IoTrashOutline } from "react-icons/io5";
import { ERROR } from 'constants/Messages';
import { DatePickerWrapper } from 'Components/DatePickerWrapper';
import uuid from 'react-uuid';
import {setTime, getAllSelectedDates } from 'utils/ScheduleUtil';
import { Timestamp } from "firebase/firestore";


interface Props {
    isModalOpen : boolean;
    onOverlayClick(): void;
    selectedDate : CellObject | null;
    selectedSchedule : ScheduleObject | null;
}

interface IForm {
    title: string;
    contents: string;
    tag : string;
  }


export const CalendarModal = ({isModalOpen, onOverlayClick, selectedDate, selectedSchedule} : Props) => {
    const isSchedule = !!selectedSchedule,
          schedule   = selectedDate && !isSchedule ? new ScheduleObject(selectedDate.startDate, selectedDate.startDate, selectedDate.startDate, '', null, '', '', '') : selectedSchedule,
          tags       = useSelector((state:RootState) => state?.tag.tags),
          currentTag = tags.find(tag => tag?.name === schedule?.tag?.name);
    const { register, handleSubmit, formState: { errors }} = useForm<IForm>();
    const [isTagInput, setTagInput] = useState(false);
    const [tagName, setTagName] = useState("");
    const [selectedTag, setSelectedTag] = useState<Tag | null>(currentTag ? currentTag : null);
    const [emptyTagNameError, setEmptyTagNameError] = useState<boolean>(false);
    const [endDate, setEndDate] = useState(schedule?.endDate);
    const calendar = useSelector((state:RootState) => state?.calendar.calendar);

    const onValid = (data:IForm) => {
        if(!schedule || !endDate){
            return;
        }

        if(!selectedTag){
            setEmptyTagNameError(true);
            return;
        }

        const dates = getAllSelectedDates(schedule.currentDate, endDate);
        
        if(!dates || dates.length === 0) return;

        const createTime = Timestamp.now();

        try{
            
            if(isSchedule){
                const scheduleObject = {
                    currentDate : format(schedule.currentDate, 'yyyy-MM-dd') ,
                    startDate : format(schedule.startDate, 'yyyy-MM-dd'), // 스케줄이 시작된 곳
                    endDate : format(endDate, 'yyyy-MM-dd'),
                    title : data.title,
                    id: schedule.id,
                    tag : selectedTag.id,
                    contents : data.contents,
                    createTime : createTime
                }

                setSchedule(scheduleObject);

            }else{
    
                const id = uuid();

                dates.forEach((selectedSchedule) => {
                    const scheduleObject = {
                        currentDate : format(selectedSchedule, 'yyyy-MM-dd'),
                        startDate : format(schedule.currentDate, 'yyyy-MM-dd') !== format(selectedSchedule, 'yyyy-MM-dd') ? format(schedule.currentDate, 'yyyy-MM-dd') : format(schedule.startDate, 'yyyy-MM-dd'), // 스케줄이 시작된 곳
                        endDate : format(endDate, 'yyyy-MM-dd'),
                        title : data.title,
                        id: id,
                        tag : selectedTag.id,
                        contents : data.contents,
                        createTime : createTime
                    }
                    
                    addSchedule(scheduleObject);
                    
                    schedule.title = data.title;
                    schedule.tag = selectedTag;
                    schedule.contents = data.contents;
                    schedule.currentDate = new Date(scheduleObject.currentDate);
                    schedule.startDate = new Date(scheduleObject.startDate);
                    schedule.endDate = new Date(scheduleObject.endDate);
                    schedule.id = id;
                })
    
                //selectedDate && selectedDate.scheduleList.push(schedule);
            }
        }catch(error){
            alert(isSchedule ? ERROR.FAILED_TO_UPDATE_SCHEDULE : ERROR.FAILED_TO_ADD_SCHEDULE);
            return;
        }

        onOverlayClick();
    }



    const setTagInputState = (event: React.MouseEvent<HTMLElement>) => {
        if(event.target instanceof SVGElement) { setTagInput(false); return; }
      
        const className = (event.target as HTMLDivElement).className,
              classes = className.split(' ');

        classes.some(cls => ['show-tag-wrapper', 'show-tag'].includes(cls)) ? setTagInput(true) : setTagInput(false);
    }

    const createTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const isDuplicate = tags.some(tag => tag.name?.trim() === tagName?.trim());

        if(event.key === "Enter" && !event.nativeEvent.isComposing && tagName.length > 0 && tagName.length < 30 && !isDuplicate) {
            const newTag = new Tag(tagName, getColor(), '');

            try{

                addTag({
                    _name : newTag.name,
                    _color : newTag.color
                }).then((res) => {
                    newTag.id = res;
                })

            }catch(error){
                alert(ERROR.FAILED_TO_ADD_TAG);
                return;
            }

            store.dispatch(addToTags([...tags, newTag]));
            setTagName('');
        } 
    }
    
    const getColor = () => {
        const colors = ["233,233,232", "227,226,224", "236,225,219", "246,223,204", "251,236,204", "223,236,221", "214,229,238", "230,223,237", "242,25,233", "251,227,222"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const selectTag = (event : React.MouseEvent<HTMLDivElement>, tag:Tag) => {
        event.stopPropagation();
        if(!schedule) return;

        setEmptyTagNameError(false);
        setSelectedTag(tag);
    }

    const deleteSelectedTag = (event : React.MouseEvent<SVGElement>) => {
        event.stopPropagation();

        setSelectedTag(null);
    }

    const deleteSchedule = () => {
        if(!isSchedule || !selectedDate) return;

        try{    
            schedule && deleteScheduleByid(schedule);
        }catch(error){
            alert(ERROR.FAILED_TO_DELETE_SCHEDULE);
            return;
        }
        
        selectedDate.scheduleList = selectedDate?.scheduleList.filter(schedule => schedule.id !== selectedSchedule.id);
        onOverlayClick();
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
                            key={selectedDate && format(selectedDate.startDate,'MM-dd')}
                            onClick={setTagInputState}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{   position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)' }}
                            onSubmit={handleSubmit(onValid)}
                            onKeyPress={(e:React.KeyboardEvent<HTMLElement>) => { e.key === 'Enter' && e.preventDefault(); }}
                        >
                            {
                                isSchedule &&
                                <div className="schedule_delete__Button"  onClick={deleteSchedule}>
                                    <IoTrashOutline/>
                                </div>
                            }

                            <ModalTop $isError={errors.hasOwnProperty("title")}>
                                <input {...register("title", {required : "제목은 필수 입력값 입니다.", maxLength : {value : 30, message : "30자 이하로 입력해 주세요."}})} type="text" placeholder='제목을 입력해 주세요.' defaultValue={schedule ? schedule.title : undefined}></input>
                            </ModalTop>
                            {
                                errors.hasOwnProperty("title") &&
                                    <ErrorMessage $isTagEmptyError={false}>
                                        * {errors?.title?.message}
                                    </ErrorMessage>
                            }
                            <ModalDate>
                                <div className="title">
                                    <FaCalendarDays/> 달력
                                </div>
                              
                                <div className="contents">
                                    {
                                     (schedule && endDate) && <DatePickerWrapper schedule={schedule} endDate={endDate} setEndDate={setEndDate}></DatePickerWrapper>
                                    }
                                </div>

                            </ModalDate>
                            <ModalTag $isTagInput={isTagInput}>
                                <div className="title">
                                    <FaHashtag/> 태그
                                </div>
                                <TagOutline className="contents" $isError={emptyTagNameError} >
                                    {
                                        !isTagInput ? <div className="show-tag-wrapper" onClick={setTagInputState}>
                                            {
                                                selectedTag ? <TagNameWrapper
                                                className="show-tag" color={selectedTag?.color}>{selectedTag?.name}</TagNameWrapper> : <span className="show-tag">비어 있음</span>
                                            }
                                            </div> 
                                             : (
                                            <CreateTagWrapper $isSchedule={isSchedule}>
                                                <div className="tag-input-wrapper">
                                                    {   
                                                        selectedTag ?
                                                        ( 
                                                            <SelectdTagWapper color={selectedTag?.color}>
                                                                <div className="selected-tag" onClick={(event) => event.stopPropagation()} >{selectedTag?.name}</div> 
                                                                <IoCloseSharp onClick={deleteSelectedTag}/>
                                                            </SelectdTagWapper>
                                                        ) : (
                                                            <input placeholder="태그를 선택하거나 생성해 주세요."
                                                                value={tagName}
                                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTagName(event.target.value)}
                                                                onClick={(event) => event.stopPropagation()}
                                                                onKeyDown={createTag}
                                                            ></input>
                                                        )
                                                    }
                                                </div>

                                                <TagList>
                                                    {
                                                        tags.map((tag)=>(
                                                            <CelendarTag key={tag.name} tag={tag} selectTag={selectTag}/>
                                                        ))
                                                    }
                                                </TagList>
                                            </CreateTagWrapper>
                                        )
                                    }
                                    
                                </TagOutline>
                                {
                                    emptyTagNameError &&
                                        <ErrorMessage $isTagEmptyError={true}>
                                            * 태그는 필수 입력값 입니다.
                                        </ErrorMessage> 
                                }
                            </ModalTag>
                            <ModalContents $isError={errors.hasOwnProperty("contents")}>
                                <textarea placeholder="내용을 입력해 주세요." defaultValue={schedule ? schedule.contents : undefined} {...register("contents", { maxLength : {value : 300, message : "300자 이하로 입력해 주세요."} })}></textarea>
                            </ModalContents>
                            {
                                errors.hasOwnProperty("contents") &&
                                    <ErrorMessage $isTagEmptyError={false}>
                                        * {errors?.contents?.message}
                                    </ErrorMessage> 
                            }
                            <ModalSubmit>
                                <button className="submit-button">{isSchedule ? '수정' : '등록'}</button>
                                <button className="cancel-button" onClick={onOverlayClick}>취소</button>
                            </ModalSubmit>
                        </CalendarModalWrapper>
                    </>)  : null
                }



            </AnimatePresence>
        </>
    )
}