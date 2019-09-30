import React, {useContext, createRef } from 'react'
import { AppContext } from '../contexts/AppContext'
import City from 'objects/City'
import ItemCity from './ItemCity'
import { SET_ITEMS_RIGHT, CLEAR_ALL } from '../constants'

const RightPanel: React.SFC = () => {
  const {state, dispatch} = useContext(AppContext);
  const scrollRef:any = createRef()
  const handleScroll = () => {
    const limit = 200;
    var scrollHeight = scrollRef.current.scrollHeight;
    var outerHeight = scrollRef.current.offsetHeight
    var refreshPosition = scrollHeight - outerHeight - limit;
    if (scrollRef.current.scrollTop >= refreshPosition && state.itemsRight<state.cities.length) {
      dispatch({type:SET_ITEMS_RIGHT,value:state.itemsRight+20})
    }else if(scrollRef.current.scrollTop===0){
      dispatch({type:SET_ITEMS_RIGHT,value:20})
    }
  }
  var j = 0
  return(
    
    <div >
      <div className="container-rigth-info-items">
        <div>{state.cities.filter((city:City)=>city.checked).length} items</div>
        <div onClick={()=>dispatch({type:CLEAR_ALL})}>clear</div>
      </div>

      <div className="container-items rigth-panel-items" onScroll={handleScroll} ref={scrollRef}>
        { 
          
 
            
            state.cities.reduce((result:any, city:City, i) => {
       
              if(!city.checked) return result
              if (j < state.itemsRight) {
                j++
                result.push(
                    <ItemCity key={i} city={city}  view={"right"}/>
                );
              }
              
              return result;
            }, [])
          

        }
      </div>
      
    </div>
  )
}

export default RightPanel