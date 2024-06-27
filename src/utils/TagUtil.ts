import { Tag } from 'model/Tag';


export const instantiationByTag = (tag:any) => {

    return new Tag(tag._name, tag._color, tag._id)
}