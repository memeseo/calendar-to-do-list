import { Tag } from 'model/Tag';


const GET_TAGS:string = 'GET_TAGS'; // slice로 변경하기

interface ITest {
    type: string,
    payload:Tag[]
}

export const fetchTags = (tags:Tag[]) => {
    return { type: GET_TAGS, payload : tags}
}

const initTag:Tag[] = [];

function tag(state:Tag[] = initTag, action:ITest){
    switch(action.type){
        case GET_TAGS : return {...state, tags : action.payload};
        default : return state;
    }
}

export default tag;