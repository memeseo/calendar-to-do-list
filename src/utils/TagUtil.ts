import { Tag } from 'model/Tag';

export const instantiationByTag = (tag:string | any) => {
    const tagObject = typeof tag === 'string' ? JSON.parse(tag) : tag;
   
    return new Tag(tagObject._name, tagObject._color)
}