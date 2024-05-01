import React from 'react'
import DashdoardTickets from '../DashdoardTickets'
import Navbar from '../Navbar'
import "..//..//css/Dashboard.css"

function DashboardTicketsPage() {
  return (
    <div>
      <Navbar label={"Ticket sales dashboard"}/>
      <DashdoardTickets />
    </div>
  )
}

export default DashboardTicketsPage
