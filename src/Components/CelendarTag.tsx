import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { Tag } from 'model/Tag';
import { TagWrapper } from 'asset/CalendarModal';

interface Props {
    tag : Tag;
    selectTag(event:React.MouseEvent<HTMLDivElement>, tag:Tag) : void;
}

export const CelendarTag = ({ tag, selectTag } : Props) => {
   return (
        <>
            <TagWrapper color={tag.color}>
                <div className="tagName" onClick={(event) => selectTag(event, tag)}>
                    <span>{tag.name}</span>
                </div>
                <IoEllipsisHorizontalCircle  onClick={(event)=> {event.stopPropagation();}}/>
            </TagWrapper>
        </>
   ); 
}