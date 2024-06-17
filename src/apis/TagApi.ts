import {db} from 'Routes/config';
import { collection, getDocs, addDoc} from "firebase/firestore";
import { fetchTags } from 'reducer/tag';
import { instantiationByTag } from 'utils/TagUtil';
import { store } from 'index';


interface ITag {
    _color : string,
    _name : string
}


export const setTags = (tag:ITag) => {

    try{
        addDoc(collection(db,"tag"), tag);

    }catch(error){
        alert('태그 등록에 실패하였습니다.');
    }
}

export const getTags = async () => {
    try{
        let fetchedTags = await getDocs(collection(db, "tag")),
            tags = fetchedTags.docs.map(doc => ({ ...doc.data() }));
    
        const newTags = tags.map(tag => instantiationByTag(tag));

       newTags.length > 0 && store.dispatch(fetchTags(newTags))
    }catch(error){
        alert('태그를 가져올 수 없습니다.');
    }
}