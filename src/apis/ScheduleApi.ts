import {db} from 'Routes/config';
import { collection, query, where, getDocs, addDoc, orderBy, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { format} from 'date-fns';
import {instantiationBySchedules} from 'utils/ScheduleUtil';
import { ScheduleObject } from 'model/Schedule';
import { ERROR } from 'constants/Messages';

interface ISchedule {
    startDate: string;
    endDate: string;
    title: string;
    id: string;
    tag: string;
    contents: string;
  }

export const getSchedulesByDate = async (date:Date) => {

    try{
        const q = await query(
            collection(db, "schedule"),
            where("startDate", "==", format(date,'yyyy-MM-dd')),
            orderBy("startDate", "desc")
        );
        
        const querySnapshot = await getDocs(q),
              schedules     = querySnapshot.docs.map(doc => ({ ...doc.data() }));
        
        return schedules.length > 0 ? instantiationBySchedules(schedules) : [];
  
    }catch(error){
         alert(ERROR.FAILED_TO_FETCH_SCHEDULES);
         throw error;
    }
}

export const addSchedule = async (schedule:ISchedule) => {
    try{
        const scheduleRef = await addDoc(collection(db, "schedule"), schedule);
        await updateDoc(scheduleRef, { id: scheduleRef.id });

        return scheduleRef.id;
    }catch(error){
        throw error;
    }
}

export const setSchedule = async (schedule:ISchedule) => {
    try{
        const scheduleRef = doc(db, 'schedule', schedule.id);
        await updateDoc(scheduleRef, {
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            title: schedule.title,
            id: schedule.id,
            tag: schedule.tag,
            contents: schedule.contents
        });
    }catch(error){
        throw error;
    }
}

export const deleteScheduleByid = async (schedule:ScheduleObject) => {
    try{
        const q        = query(collection(db, 'schedule'), where('id', "==", schedule.id)),
        querySnapshot  = await getDocs(q),
        deletePromises = querySnapshot.docs.map(docSnapshot => deleteDoc(doc(db, 'schedule', docSnapshot.id)));
    
        await deletePromises;
    }catch(error){
        throw error;
    }
}