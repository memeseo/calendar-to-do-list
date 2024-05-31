import { Tag } from 'model/Tag';

export const instantiationByTag = (tag:any) => {
    const tagObject = JSON.parse(tag);
    console.log('tagObject', tagObject)
    return new Tag(tagObject.name, tagObject.color)
}