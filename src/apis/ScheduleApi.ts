import {db} from 'Routes/config';
import { collection, query, where, getDocs, addDoc, orderBy} from "firebase/firestore";
import { format} from 'date-fns';
import {instantiationBySchedules} from 'utils/ScheduleUtil';

interface ISchedule {
    startDate: string;
    endDate: string;
    title : string;
    tag : string;
    contents : string;
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

export const setSchedules = (schedule:ISchedule) => {
    try{
        addDoc(collection(db, "schedule"), schedule);

    }catch(error){
        alert('스케줄 등록에 실패하였습니다.');
    }
}
