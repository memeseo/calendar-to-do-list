import { IoTrashOutline } from "react-icons/io5";
import { Tag } from 'model/Tag';
import { TagWrapper } from 'asset/CalendarModal';
import { deleteTag, getUsedTag } from 'apis/TagApi';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer/index';
import { removeTag } from 'reducer/tag';
import store from 'reducer/index';
import { ERROR } from 'constants/Messages';

interface Props {
    tag : Tag;
    selectTag(event:React.MouseEvent<HTMLDivElement>, tag:Tag) : void;
}


export const CelendarTag = ({ tag, selectTag } : Props) => {
    const tags = useSelector((state:RootState) => state?.tag.tags);
    const calendar = useSelector((state:RootState) => state?.calendar.calendar);
    
    const deleteTagByName = async (tag:Tag, event:React.MouseEvent<SVGElement, MouseEvent>) => {
        event.stopPropagation();

        const isUsedTag = await getUsedTag(tag);
        if(isUsedTag) {alert(ERROR.FAILED_TO_DELETE_USING_TAG); return;}

        try{
            deleteTag(tag);
            
        }catch(error){
            alert(ERROR.FAILED_TO_DELETE_TAG);
            return;
        }
       
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