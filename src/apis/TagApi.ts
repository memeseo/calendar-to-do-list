import {db} from 'Routes/config';
import { collection, getDocs, addDoc, query, where, deleteDoc, doc} from "firebase/firestore";
import { instantiationByTag } from 'utils/TagUtil';
import store from 'reducer/index';
import { fetchTags } from 'reducer/tag';
import { Tag } from 'model/Tag';
import { ERROR } from 'constants/Messages';

interface ITag {
    _name : string,
    _color : string
}
export const addTag = (tag:ITag) => {
    try{
        addDoc(collection(db,"tag"), tag);

    }catch(error){
        throw error;
    }
}

export const getTags = async () => {
    try{
        let fetchedTags = await getDocs(collection(db, "tag")),
            tags = fetchedTags.docs.map(doc => ({ ...doc.data() }));
    
        const newTags = tags.map(tag => instantiationByTag(tag));

        newTags.length > 0 && store.dispatch(fetchTags(newTags))
    }catch(error){
        alert(ERROR.FAILED_TO_FETCH_TAGS);
    }
}

export const deleteTag = async (tag:Tag) => {
    try{
        const q              = query(collection(db, 'tag'), where('_name', "==", tag._name)),
              querySnapshot  = await getDocs(q),
              deletePromises = querySnapshot.docs.map(docSnapshot => deleteDoc(doc(db, 'tag', docSnapshot.id)));

        await deletePromises;
      
    }catch(error){
        throw error;
    }
}