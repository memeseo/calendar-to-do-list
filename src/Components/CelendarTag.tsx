import { IoTrashOutline } from "react-icons/io5";
import { Tag } from 'model/Tag';
import { TagWrapper } from 'asset/CalendarModal';
import { deleteTag } from 'apis/TagApi';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer/index';
import { removeTag } from 'reducer/tag';
import store from 'reducer/index';

interface Props {
    tag : Tag;
    selectTag(event:React.MouseEvent<HTMLDivElement>, tag:Tag) : void;
}


export const CelendarTag = ({ tag, selectTag } : Props) => {
    const tags = useSelector((state:RootState) => state?.tag.tags);
    
    const deleteTagByName = (tag:Tag, event:React.MouseEvent<SVGElement, MouseEvent>) => {
        event.stopPropagation();
    
        deleteTag(tag);
        const newTags = tags.filter(savedTag => savedTag._name !== tag._name);
        store.dispatch(removeTag(newTags));
    }

   return (
        <>
            <TagWrapper color={tag.color}>
                <div className="tagName" onClick={(event) => selectTag(event, tag)}>
                    <span>{tag.name}</span>
                </div>
                <IoTrashOutline onClick={ (event)=> deleteTagByName(tag, event)}/>
            </TagWrapper>
        </>
   ); 
}