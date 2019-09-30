import React, {useEffect, useReducer } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import City from '../objects/City'
import {ICity} from '../interfaces'
import {IState, IAction, AppContext} from '../contexts/AppContext'
import {SET_CITIES, SEARCH_VALUE, SET_ITEMS, SET_ITEMS_RIGHT, CLEAR_ALL, SELECT_ALL, UPDATE_CHECKED} from '../constants'
const json = require('../assets/data/cities-of-china.json')

const initialState = {
  search: "",
  cities: [],
  items:20,
  itemsRight: 20
}

const stateReducers = (state:IState, action:IAction) => {
  switch (action.type) {
    case SET_CITIES : {
      return {...state, cities: action.value}
    }
    case SEARCH_VALUE: {
      return {...state, search: action.value, items:20}
    }
    case SET_ITEMS: {
      return {...state, items: action.value}
    }
    case SET_ITEMS_RIGHT: {
      return {...state, itemsRight: action.value}
    }
    case CLEAR_ALL: {
      let cities = [...state.cities]
      cities.forEach((city)=>{
        city.checked = false
      })
      return {...state, cities, itemsRight:20}
    }
    case SELECT_ALL: {
      let cities = [...state.cities]
      
      cities.forEach((city)=>{
        if(action.value.ids.includes(city.id)){
          city.checked = action.value.checked
        }
      })
      return {...state, cities, itemsRight:!action.value.checked?state.itemsRight:20}
    }
    case UPDATE_CHECKED: {
      let cities = [...state.cities]
      
      cities.find((city)=>{
        if(city.id===action.value.id){
          city.checked = action.value.value
          return true
        }
        return false
      })
      
      
      return {...state, cities}
    }
    default: {
      return state
    }
  }
}
const DataTable: React.SFC = () => {

  const [state, dispatch] = useReducer(stateReducers, initialState)

  useEffect(()=>{
    var cities: ICity[] = []
    json.cities.forEach( (element:ICity) => {
      cities.push(new City(element))
    });
    dispatch({type:SET_CITIES,value:cities})
  },[])

  return(
    <AppContext.Provider value={{state, dispatch}}>
      <div className='data-table'>
        <LeftPanel />
        <RightPanel />
      </div>
    </AppContext.Provider>
  )
}

export default DataTable