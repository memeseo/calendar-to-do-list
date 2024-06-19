import {db} from 'Routes/config';
import { collection, query, where, getDocs, addDoc, orderBy, updateDoc, doc} from "firebase/firestore";
import { format} from 'date-fns';
import {instantiationBySchedules} from 'utils/ScheduleUtil';

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
         alert('스케줄을 가져오는데 실패하였습니다.');
    }
}

export const addSchedule = async (schedule:ISchedule) => {
    try{
        const scheduleRef = await addDoc(collection(db, "schedule"), schedule);
        await updateDoc(scheduleRef, { id: scheduleRef.id });

    }catch(error){
        alert('스케줄 등록에 실패하였습니다.');
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
        alert('스케줄 수정에 실패하였습니다.');
    }
}