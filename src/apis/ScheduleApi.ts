import {db} from 'Routes/config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { format} from 'date-fns';
import {instantiationBySchedules} from 'utils/ScheduleUtil';

export const getSchedulesByDate = async (date:Date) => {

    try{
        const q = await query(
            collection(db, "schedule"),
            where("startDate", "==", format(date,'yyyy-MM-dd'))
        );
        
        const querySnapshot = await getDocs(q),
              schedules     = querySnapshot.docs.map(doc => ({ ...doc.data() }));
        
        return schedules.length > 0 ? instantiationBySchedules(schedules) : [];
  
    }catch(error){
         alert('스케줄을 가져오는데 실패하였습니다.');
    }
}

export const setSchedules = () => {

}

export const setTags = () => {

}