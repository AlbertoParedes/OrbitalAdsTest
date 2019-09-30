import City from 'objects/City';

export interface IPropsTitle {
  title : string
}

export interface ICity {
  id:string,
  name: string,
  chineseName: string
}
export interface IPropsInfoLeft {
  cities: City[],
  search: string,
  setChecks: any
}
export interface IPropsItemCity{
  city: City,
  view: string,
  updateChecked : any,
  datachinisename? : string
}