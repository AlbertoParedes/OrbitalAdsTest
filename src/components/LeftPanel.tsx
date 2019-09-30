import React, {useContext, createRef, useEffect, useState} from 'react'
import { AppContext } from '../contexts/AppContext'

import {ReactComponent as Search} from '../assets/images/search-icon.svg';
import {ReactComponent as CheckBox} from '../assets/images/check-box.svg';
import {ReactComponent as CheckBoxChecked} from '../assets/images/check-box-checked.svg';
import {ReactComponent as CheckBoxCheckedSome} from '../assets/images/check-box-some.svg';


import City from 'objects/City';
import ItemCity from './ItemCity';
import { IPropsInfoLeft } from 'interfaces';
import { SET_ITEMS, SEARCH_VALUE, SELECT_ALL } from '../constants';


const LeftPanel = () => {
  
  const {state, dispatch} = useContext(AppContext)
  const scrollRef:any = createRef()

  const handleScroll = () => {
    const limit = 200;
    var scrollHeight = scrollRef.current.scrollHeight;
    var outerHeight = scrollRef.current.offsetHeight
    var refreshPosition = scrollHeight - outerHeight - limit;
    if (scrollRef.current.scrollTop >= refreshPosition && state.items<state.cities.length) {
      dispatch({type:SET_ITEMS,value:state.items+20})
    }
  }
  

  var j = 0;

  return(
    <div>
      
      <div className='container-search-city'>
        <input 
          type="text" 
          placeholder="Search by name" 
          value={state.search} 
          onChange={e=>dispatch({type: SEARCH_VALUE, value:e.currentTarget.value})}
        />
        <Search />
      </div>

      <InfoLeft cities={state.cities} search={state.search} setChecks={(value:any)=>dispatch({type:SELECT_ALL, value})} />

      

      <div className="container-items" onScroll={handleScroll} ref={scrollRef} >
        {
          state.cities.reduce((result:any, city:City, i) => {
            if(state.search.trim()!=='' && !city.name.toLocaleLowerCase().includes(state.search.trim().toLocaleLowerCase())) return result
            if (j < state.items) {
              result.push(<ItemCity key={i} city={city} view={'left'}/>)
              j++
            }
            return result;
          }, [])
        }
      </div>

    </div>
  )
}
export default LeftPanel


const InfoLeft = (props: IPropsInfoLeft) => {
  
  const [cities, setCities] = useState(props.cities) 
  const [some, setSome] = useState(0) 

  useEffect(()=>{

    var newCities: City[] = props.cities

    if(props.search.trim()!==""){
      newCities = newCities.filter((city:City)=>city.name.toLowerCase().includes(props.search.trim().toLowerCase()))
    }

    var someChecked = newCities.some((city:City)=>city.checked)
    var someEmpty = newCities.some((city:City)=>!city.checked)

    if(!someEmpty && newCities.length>0){
      setSome(2)
    }else if(!someChecked){
      setSome(0)
    }else{
      setSome(1)
    }

    setCities(newCities)
    
  },[props.search, props.cities])

  const setChecks = (checked:boolean) => {
    const ids = cities.map((city:City)=> city.id);
    props.setChecks({ids,checked})
  }


  return(
    <div className="container-left-info-items">
      <div className="container-check-box">
      {some===0?<CheckBox className='check-box' onClick={()=>setChecks(true)}/>:null}
      {some===1?<CheckBoxCheckedSome className='check-box-checked' onClick={()=>setChecks(true)}/>:null}
      {some===2?<CheckBoxChecked className='check-box-checked' onClick={()=>setChecks(false)}/>:null}
        
      </div>
      <div>
        {cities.length} items
      </div>
    </div>
  )
}
