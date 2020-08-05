
import express, { Router, Request, Response, NextFunction } from "express";
import {generateData} from '../common/utils'
import {IPromotion,} from '../common/interfaces'
import {findAndUpdatePromotion, deletePromotion, insertPromotion, clearAllPromotions, duplicatePromotion, findPromotion} from '../db/logic/promotionLogic'


const router: Router = express.Router();

router.get("/generatePromotions", async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await clearAllPromotions();
    let promotions: Record<number, IPromotion> = generateData();
    await insertPromotion(Object.values(promotions)).then((insertResult) => {
      if (insertResult) {
        res.send(insertResult);
      }
    });

  } catch(error) {
    next(error);
}
});

router.delete("/deletePromotion", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let ids: number[] = req.body.data;
    await deletePromotion(ids).then((isDeleted) => {
      if (isDeleted) {
        res.send(req.body);
      } else {
        res.send({});
      }

    });
  } catch(error) {
    next(error);
  }
});

router.post("/duplicatePromotion", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let ids: number[] = req.body.data;
    duplicatePromotion(ids).then((duplicatePromotion) => {
      if (duplicatePromotion) {
        res.send(duplicatePromotion);
      } else {
        res.send({});
      }
    });


  } catch(error) {
    next(error);
  }
});

router.post("/editPromotion", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let editablePromotion: Record<number, any> = req.body.data;
    await findAndUpdatePromotion(editablePromotion).then(async () => {
      await findPromotion(Object.keys(editablePromotion)).then((editedResults) => {
        res.send(editedResults);
      });

    });
  } catch(error) {
    next(error);
  }
});

export default router;
