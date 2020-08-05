import {IPromotion, PromotionTypeEnum} from '../common/interfaces'
import {TABLE_ROWS_SIZE, START_RANDOM_DATE, END_RANDOM_DATE} from '../config'

export const generateData = (): Record<number, IPromotion> => {
  var promotions: Record<number, IPromotion> = {};
  for (let i = 0 ; i < TABLE_ROWS_SIZE ; i++) {
    promotions[i] = {
      _id: i,
      name: i.toString(), //`Promotion ${getRandomInt(START_RANDOM_NUMBER, END_RANDOM_NUMBER)}`,
      type: getRandomEnumIndex(PromotionTypeEnum, getRandomInt(1, 3)) as PromotionTypeEnum,
      start: getRandomDate(START_RANDOM_DATE, END_RANDOM_DATE),
      end: getRandomDate(START_RANDOM_DATE, END_RANDOM_DATE),
      userGroupName: i.toString()//`Group ${getRandomInt(START_RANDOM_NUMBER, END_RANDOM_NUMBER)}`
    } as IPromotion;
  } 
  return promotions;
}

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomEnumIndex = <T>(anEnum: T, randomIndex: number) =>{
  const enumValues = ToArray(anEnum);
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue;
}

export const getRandomDate = (date1: string, date2: string) : string => {
  let date1Val = new Date(date1).getTime()
  let date2Val = new Date(date2).getTime()
  if( date1 > date2){
      return new Date(getRandomInt(date2Val,date1Val)).toLocaleDateString()   
  } else{
      return new Date(getRandomInt(date1Val, date2Val)).toLocaleDateString()  

  }
}

export const ToArray = (enumme: any) => {
  return Object.keys(enumme)
      .map(key => enumme[key]);
}