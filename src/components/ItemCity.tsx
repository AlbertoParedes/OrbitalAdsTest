import React, {memo, useContext, useCallback} from 'react'
import { AppContext } from '../contexts/AppContext'

import {ReactComponent as CheckBox} from '../assets/images/check-box.svg';
import {ReactComponent as CheckBoxChecked} from '../assets/images/check-box-checked.svg';
import {ReactComponent as Clear} from '../assets/images/clear.svg';
import imageCity from '../assets/images/image-city.png'
import { IPropsItemCity } from 'interfaces';
import { UPDATE_CHECKED } from '../constants';

const ItemCity = (props:any) => {
  const {dispatch} = useContext(AppContext)
  const updateChecked = useCallback((value:any)=>{dispatch({type:UPDATE_CHECKED,value})}, [props.city.checked])
  return(
    <Item  city={props.city} updateChecked={updateChecked} view={props.view}/>
  )
}


const Item = memo((props:IPropsItemCity) =>{
  
  return(
    <div
      id={props.city.id}
      data-name={props.city.name}
      data-chinesename={props.city.chineseName}
      className={`item-city ${props.view==="left"?'cursor-pointer':''}`} 
      onClick={()=>
        {props.view==='left'? props.updateChecked({id:props.city.id,value:!props.city.checked}) :null }
      }
    >
      {props.view==='left'?
        <div className="container-check-box">
          {!props.city.checked?
            <CheckBox className='check-box'/> :
            <CheckBoxChecked className='check-box-checked'/>
          }
        </div>:null
      }
      
      <div className="container-image" >
        <div> <img src={imageCity} alt=""/> </div>
      </div>

      <div className="container-text">
        <div>{props.city.name}</div>
        <div>{props.city.chineseName}</div>
      </div>

      {props.view==="right"?
        <div className='container-delete-item'>
          <Clear className='check-box' onClick={()=>props.updateChecked({id:props.city.id,value:false})}/> 
        </div>
      :null
      }

    </div>
  )
})

export default ItemCity