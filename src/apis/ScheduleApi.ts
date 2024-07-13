import {db} from 'Routes/config';
import { collection, query, where, getDocs, getDoc, addDoc, orderBy, updateDoc, doc, deleteDoc, Timestamp} from "firebase/firestore";
import { format} from 'date-fns';
import {instantiationBySchedules} from 'utils/ScheduleUtil';
import { ScheduleObject } from 'model/Schedule';
import { ERROR } from 'constants/Messages';
import store, { RootState } from 'reducer/index';
import { getAllSelectedDates } from 'utils/ScheduleUtil';

interface ISchedule {
    currentDate: string;
    startDate: string;
    endDate: string;
    createTime: Timestamp;
    title: string;
    id: string;
    tag: string;
    contents: string;
  }

export const getSchedulesByDate = async (date:Date) => {

    try{
        const q = await query(
            collection(db, "schedule"),
            where("currentDate", "==", format(date,'yyyy-MM-dd')),
            orderBy("createTime", "asc")
        );
        
        const querySnapshot = await getDocs(q),
              schedules     = querySnapshot.docs.map(doc => {
                const schedule = doc.data(),
                      tag      = getMatchedTag(schedule.tag);
             
                schedule.tag = tag;
                return schedule
              });

              
        return schedules.length > 0 ? instantiationBySchedules(schedules) : [];
  
    }catch(error){
         alert(ERROR.FAILED_TO_FETCH_SCHEDULES);
         throw error;
    }
}

const getMatchedTag = (tagId:string) => {
    const state: RootState = store.getState();
    return state.tag.tags?.find(tag => tag.id === tagId);
}

export const addSchedule = async (schedule:ISchedule) => {
    try{
        const scheduleRef = await addDoc(collection(db, "schedule"), schedule);

        return scheduleRef.id;
    }catch(error){
        throw error;
    }
}

export const setSchedule = async (schedule:ISchedule) => {
    try{
        const q = await query(
            collection(db, "schedule"),
            where("id", "==", schedule.id)
        );

        const querySnapshot = await getDocs(q),
              schedules     = querySnapshot.docs.map(doc => ({...doc.data()}));
        

        const newEndDate = new Date(schedule.endDate),
              shouldAddSchedule = newEndDate > new Date(schedules[0].endDate); // false는 갖거나 삭제해야 함, true는 추가해야 함
        

        if(shouldAddSchedule) {
            querySnapshot.forEach(async (docSnapshot) => {
                const scheduleRef = doc(db, 'schedule', docSnapshot.id);
                    await updateDoc(scheduleRef, {
                            startDate: schedule.startDate,
                            endDate: schedule.endDate,
                            title: schedule.title,
                            id: schedule.id,
                            tag: schedule.tag,
                            contents: schedule.contents
                    });
            }); // 기존 데이터 업데이트 

            const nextDate = new Date(schedules[0].endDate);
            nextDate.setDate(nextDate.getDate() + 1);

            const dates = getAllSelectedDates(nextDate, new Date(schedule.endDate));

            dates.forEach((selectedSchedule) => {
                const scheduleObject = {
                    currentDate : format(selectedSchedule, 'yyyy-MM-dd'),
                    startDate : format(schedule.currentDate, 'yyyy-MM-dd'),
                    endDate : format(schedule.endDate, 'yyyy-MM-dd'),
                    title : schedule.title,
                    id: schedule.id,
                    tag : schedule.tag,
                    contents : schedule.contents,
                    createTime : schedule.createTime
                }
    
                addSchedule(scheduleObject);
            }) // 추가 되는 데이터 업데이트
        } else if (newEndDate === new Date(schedules[0].endDate)) {
            console.log('endDate 안 변햇음 ㅋ')
        }else {
            console.log('endDate 줄어듬 ㅋ')
        }

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