
import { AnimatePresence, useViewportScroll} from "framer-motion";
import { format} from 'date-fns';
import { useForm } from 'react-hook-form';
import {CalendarModalWrapper, Overley, ModalTop, ModalDate, ModalTag, ModalContents, ModalSubmit,
        ErrorMessage, CreateTagWrapper, TagList, SelectdTagWapper, TagNameWrapper, TagOutline} from 'asset/CalendarModal';
import { FaCalendarDays } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { CellObject } from 'model/Cell';
import { useState } from "react";
import { CelendarTag } from "Components/CelendarTag";
import { Tag } from 'model/Tag';
import { ScheduleObject } from "model/Schedule";
import { IoCloseSharp } from "react-icons/io5";
import { setSchedules } from 'apis/ScheduleApi';
import { setTags } from 'apis/TagApi';
import { useSelector } from 'react-redux';
import store, { RootState } from 'reducer/index';
import { addToTags } from 'reducer/tag';

interface Props {
    isModalOpen : boolean;
    onOverlayClick(): void;
    selectedDate : CellObject;
}

interface IForm {
    title: string;
    contents: string;
    tag : string;
  }


export const CalendarModal = ({isModalOpen, onOverlayClick, selectedDate} : Props) => {
    const { scrollY } = useViewportScroll();
    const { register, handleSubmit, formState: { errors }} = useForm<IForm>();
    const [isTagInput, setTagInput] = useState(false);
    const [tagName, setTagName] = useState("");

    const [schedule, setSchedule] = useState<ScheduleObject>(new ScheduleObject(format(selectedDate.startDate, 'yyyy-MM-dd'), null, '', ''));
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [emptyTagNameError, setEmptyTagNameError] = useState<boolean>(false);

    const onValid = (data:IForm) => {
        if(!selectedTag){
            setEmptyTagNameError(true);
            return;
        }

        setSchedules({
                startDate : schedule.startDate,
                endDate : schedule.endDate,
                title : data.title,
                tag : JSON.stringify(selectedTag),
                contents : data.contents,
        });

        schedule.title = data.title;
        schedule.tag = selectedTag;
        schedule.contents = data.contents;
        selectedDate.scheduleList.push(schedule);
        onOverlayClick();
    }

    const setTagInputState = (event: React.MouseEvent<HTMLElement>) => {
        const className = (event.target as HTMLDivElement).className,
              classes = className.split(' ');

        classes.some(cls => ['show-tag-wrapper', 'show-tag'].includes(cls)) ? setTagInput(true) : setTagInput(false);
    }

    const tags = useSelector((state:RootState) => state?.tag.tags);

    const createTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const isDuplicate = tags.some(tag => tag.name?.trim() === tagName?.trim());

        if(event.key === "Enter" && !event.nativeEvent.isComposing && tagName.length > 0 && tagName.length < 30 && !isDuplicate) {
            const newTag = new Tag(tagName, getColor());

            setTags({
                _name : newTag.name,
                _color : newTag.color
            });

            store.dispatch(addToTags([...tags, newTag]));
            setTagName('');
        } 
    }
    
    const getColor = () => {
        const colors = ["233,233,232", "227,226,224", "236,225,219", "246,223,204", "251,236,204", "223,236,221", "214,229,238", "230,223,237", "242,25,233", "251,227,222"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const selectTag = (event : React.MouseEvent<HTMLDivElement>, tag:Tag) => {
        //event.stopPropagation();
        schedule.tag = tag;
        setEmptyTagNameError(false);
        setSelectedTag(schedule.tag);
    }

    const deleteSelectedTag = (event : React.MouseEvent<SVGElement>) => {
        event.stopPropagation();

        setSelectedTag(null);
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
                            key={format(selectedDate.startDate,'MM-dd')}
                            onClick={setTagInputState}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ top: scrollY.get() + 100 }}
                            onSubmit={handleSubmit(onValid)}
                            onKeyPress={(e:React.KeyboardEvent<HTMLElement>) => { e.key === 'Enter' && e.preventDefault(); }}
                        >
                            <ModalTop $isError={errors.hasOwnProperty("title")}>
                                <input {...register("title", {required : "제목은 필수 입력값 입니다.", maxLength : {value : 30, message : "30자 이하로 입력해 주세요."}})} type="text" placeholder='제목을 입력해 주세요.'></input>
                            </ModalTop>
                            {
                                errors.hasOwnProperty("title") &&
                                    <ErrorMessage isTagEmptyError={false}>
                                        * {errors?.title?.message}
                                    </ErrorMessage>
                            }
                            <ModalDate>
                                <div className="title">
                                    <FaCalendarDays/> 달력
                                </div>
                                <div className="contents">{selectedDate ? format(selectedDate.startDate, 'yyyy M월 d일') : null}</div>
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
                                            <CreateTagWrapper>
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
                                        <ErrorMessage isTagEmptyError={true}>
                                            * 태그는 필수 입력값 입니다.
                                        </ErrorMessage> 
                                }
                            </ModalTag>
                            <ModalContents $isError={errors.hasOwnProperty("contents")}>
                                <textarea placeholder="내용을 입력해 주세요." {...register("contents", { maxLength : {value : 300, message : "300자 이하로 입력해 주세요."} })}></textarea>
                            </ModalContents>
                            {
                                errors.hasOwnProperty("contents") &&
                                    <ErrorMessage isTagEmptyError={false}>
                                        * {errors?.contents?.message}
                                    </ErrorMessage> 
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