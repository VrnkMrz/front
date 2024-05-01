import React from 'react'
import DashboardWagons from '../DashboardWagon'
import Navbar from '../Navbar'
import "..//..//css/Dashboard.css"

function DashboardWagonPage() {
  return (
    <div>
      <Navbar label={"Wagon efficiency dashboard"}/>
      <DashboardWagons />
    </div>
  )
}

export default DashboardWagonPage
