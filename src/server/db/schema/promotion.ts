import {Document, Schema} from 'mongoose';
import {PromotionTypeEnum, IPromotion} from '../../common/interfaces' 
import {ToArray} from '../../common/utils'
import * as mongoose from 'mongoose';

type PromotionType = IPromotion & Document;


export const PromotionModel = mongoose.model<PromotionType>('Promotion', new Schema({
    _id: Number,
    name: String,
    type:  {type: String, enum: ToArray(PromotionTypeEnum)},
    start: String,
    end: String,
    userGroupName: String
},{ _id: false }).set('toJSON', {
    virtuals: true,
    transform: function (_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}));