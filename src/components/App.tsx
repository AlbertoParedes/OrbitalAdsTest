import React from 'react'
import TitleBar from './TitleBar'
import DataTable from './DataTable'
import '../assets/scss/style.css'


const App = () => {
  return (
    <div className="container-table">
      <TitleBar title={"Cities of China"} />
      <DataTable />
    </div>
  )
}


export default App