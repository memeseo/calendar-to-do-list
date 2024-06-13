import { Tag } from 'model/Tag';

export const instantiationByTag = (tag:any) => {
    const tagObject = JSON.parse(tag);
    return new Tag(tagObject._name, tagObject._color)
}