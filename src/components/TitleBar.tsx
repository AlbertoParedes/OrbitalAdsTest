import React from 'react'
import { IPropsTitle } from 'interfaces'

const TitleBar: React.SFC<IPropsTitle> = props => {
  return(
    <div className="title-bar">
      {props.title}
    </div>
  )
}

export default TitleBar