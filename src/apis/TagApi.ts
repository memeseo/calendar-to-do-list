import {db} from 'Routes/config';
import { collection, getDocs, addDoc, query, where, deleteDoc, doc, updateDoc, serverTimestamp, orderBy} from "firebase/firestore";
import { instantiationByTag } from 'utils/TagUtil';
import store from 'reducer/index';
import { fetchTags } from 'reducer/tag';
import { Tag } from 'model/Tag';
import { ERROR } from 'constants/Messages';
import { format } from 'date-fns';

interface ITag {
    _name : string,
    _color : string
}
export const addTag = async (tag:ITag) => {
    try{
        const tagRef = await addDoc(collection(db,"tag"), {...tag, _date: serverTimestamp()});
        updateDoc(tagRef, { _id: tagRef.id });

        return tagRef.id;
    }catch(error){
        throw error;
    }
}

export const getTags = async () => {
    try{

        const TagQ = await query(
            collection(db, "tag"),
            orderBy("_date", "asc")
        );
        
        const scheduleQuerySnapshot = await getDocs(TagQ),
              tags = scheduleQuerySnapshot.docs.map(doc => ({ ...doc.data() }));
        
        const newTags = tags.map(tag => instantiationByTag(tag));
        newTags.length > 0 && store.dispatch(fetchTags(newTags));

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

export const getUsedTag = async (tag:Tag) => {

    const q = await query(
                        collection(db, "schedule"),
                        where("tag", "==", tag.id)
                    ),
        querySnapshot = await getDocs(q),
        schedule = querySnapshot.docs.map(doc => ({...doc.data()}));

    return schedule?.length > 0;
}