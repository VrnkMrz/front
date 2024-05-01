import React from 'react'
import DashdoardServices from '../DasboardServices'
import Navbar from '../Navbar'
import "..//..//css/Dashboard.css"

function DashboardServicePage() {
  return (
    <div>
      <Navbar label={"Service sales dashboard"}/>
      <DashdoardServices />
    </div>
  )
}

export default DashboardServicePage
