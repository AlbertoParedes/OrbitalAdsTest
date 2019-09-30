import {createContext} from 'react'
import City from 'objects/City'

export interface IState{
  search: string,
  cities: City[],
  items: number,
  itemsRight: number
}

export interface IAction{
  type: string,
  value?: any
}

interface IContextProps {
  state: IState;
  dispatch: any
}
export const AppContext = createContext({} as IContextProps)