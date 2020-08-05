

export interface IPromotion {
  _id: number,
  name: string,
  type: PromotionTypeEnum,
  start: string,
  end: string,
  userGroupName: string
}

export interface IUserGroup {
  id: number,
  name: string
}

export enum PromotionTypeEnum { 
  Basic = "Basic",
  Common = "Common",
  Epic = "Epic"
}