
export interface DataElement {
  index: number;
  item: JSX.Element;
}

export interface Promotion {
  id: number,
  name?: string,
  type?: PromotionType,
  start?: string,
  end?: string,
  userGroupName?: string
}

export enum PromotionType { 
  Basic = "Basic",
  Common = "Commin",
  Epic = "Epic"
} 