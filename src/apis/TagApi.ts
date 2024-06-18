import {db} from 'Routes/config';
import { collection, getDocs, addDoc, query, where, deleteDoc, doc} from "firebase/firestore";
import { instantiationByTag } from 'utils/TagUtil';
import store from 'reducer/index';
import { fetchTags } from 'reducer/tag';
import { Tag } from 'model/Tag';

interface ITag {
    _name : string,
    _color : string
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

export const deleteTag = async (tag:Tag) => {
    try{
        const q              = query(collection(db, 'tag'), where('_name', "==", tag._name)),
              querySnapshot  = await getDocs(q),
              deletePromises = querySnapshot.docs.map(docSnapshot => deleteDoc(doc(db, 'tag', docSnapshot.id)));

        await deletePromises;
      
    }catch(error){
        alert('태그 삭제에 실패하였습니다.');
    }
}