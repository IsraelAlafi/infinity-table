

import {PromotionModel} from '../schema/promotion'
import { IPromotion } from '../../common/interfaces';

export const findAndUpdatePromotion = async (updateObject: Record<number, any>) => {
  let asyncUpdates = [];
  for (let id in updateObject) {
      asyncUpdates.push(await PromotionModel.findByIdAndUpdate({ _id: id}, updateObject[id], async (error) => {
          if (error) {
            console.log(`Error update prtomotion: ${error}`);
          }
        }));
  }
  return await Promise.all(asyncUpdates);
}

export const findPromotion = async (ids: string[]) => {
  return new Promise((resolve, reject) => {
     PromotionModel.find({_id: ids}, async (error, result) => {
      if (error){
        console.log(`Error delete prtomotions: ${error}`);
        reject(null);
      }
      if(result) {
        let promotions :Record<number, any> = {};
        result.forEach((model) => {
          promotions[model.id] = model.toJSON()
        });
        resolve(promotions);
      }
    });
  });
}

export const deletePromotion = async (ids: number[]) => {
  return new Promise((resolve, reject) => {
    PromotionModel.deleteMany({ _id: ids}, async(error: any) => {
      if (error){
        console.log(`Error delete prtomotions: ${error}`);
        reject(false);
      }
        resolve(true)
    });
  });
}

export const insertPromotion = async (promotions: IPromotion[]) => {
  return new Promise((resolve, reject) => PromotionModel.insertMany(promotions, async (error, result) => {
    if (error) {
      console.log(`Error insert prtomotions: ${error}`);
      reject (null);
    }
    if (result){
      resolve(result.map((model) => model.toJSON()));
    }
  }));
}

export const clearAllPromotions = async () => {
  return new Promise((resolve, reject) => { 
    PromotionModel.collection.deleteMany({}, (error) => {
      if (error) {
        console.log(`Error insert prtomotions: ${error}`);
        reject(false);
      }
      resolve(true);
    });
  });
}

// increament the last id for the duplicated entry
export const duplicatePromotion = async (ids: number[]) => {
  return new Promise(async (resolve, reject) => {
    let lastId = -1;
    let lastDoc = await PromotionModel.find().sort({ _id: -1 }).limit(1);
    if (lastDoc){
      lastId = lastDoc[0]?.toJSON().id;
    }
    if (lastId) {
      let findPromotion = await PromotionModel.find({_id: ids}, (error, result) => {
        if (error) {
          console.log(`Error get prtomotions: ${error}`);
          reject(null);
        }
        if (result) {
          return result.map((model) => model.toJSON());
        }
      });
  
      let duplicatePromotion :Record<number, any> = {};
      findPromotion.forEach((model) => {
        let promotion: IPromotion = model.toJSON();
        promotion._id = ++lastId;
        duplicatePromotion[promotion._id] = promotion;
      });
      
      await insertPromotion(Object.values(duplicatePromotion)).then(() => {
        resolve(duplicatePromotion)
      }).catch(() => reject(null));
    }
  });

}