import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Ticket from '../Ticket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockTicketsData = [
  {
    usageTimestamp: "8 Квітня, Понеділок",
    wagonType: "Івано-Франківськ - Львів",
    departureTime: "04:00",
    arrivalTime: "06:58",
    trainNumber: "867Д",
    priceWithDiscount: 100,
    passengers: [
      { firstName: "Вероніка Мороз", wagonNumber: 4, seat: 7 },
      { firstName: "Богдан Вишар", wagonNumber: 3, seat: 8 }
    ]
  },
  {
    usageTimestamp: "9 Квітня, Вівторок",
    wagonType: "Київ - Одеса",
    departureTime: "22:00",
    arrivalTime: "06:20",
    trainNumber: "092Л",
    priceWithDiscount: 80,
    passengers: [
      { firstName: "Олексій Какчук", wagonNumber: 5, seat: 12 },
      { firstName: "Марія Марків", wagonNumber: 5, seat: 13 }
    ]
  },
  {
    usageTimestamp: "10 Квітня, Середа",
    wagonType: "Харків - Дніпро",
    departureTime: "14:30",
    arrivalTime: "17:45",
    trainNumber: "755Д",
    passengers: [
      { firstName: "Андрій Стус", wagonNumber: 2, seat: 32 },
      { firstName: "Ірина Шевченко", wagonNumber: 2, seat: 33 }
    ]
  }
];

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        setTickets(mockTicketsData);
    }, []);

    const handleTicketReturnConfirm = () => {
        toast.success("Ticket return confirmed successfully!");
    };

    return (
        <div>
            <Navbar label = {"TICKET HISTORY"}/>
              {tickets.map((ticket, index) => (
                  <Ticket
                      key={index}
                      usageTimestamp={ticket.usageTimestamp}
                      wagonType={ticket.wagonType}
                      departureTime={ticket.departureTime}
                      arrivalTime={ticket.arrivalTime}
                      trainNumber={ticket.trainNumber}
                      priceWithDiscount={ticket.priceWithDiscount}
                      passengers={ticket.passengers}
                      onTicketReturnConfirm={handleTicketReturnConfirm} 
                  />
              ))} 
            <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  closeOnClick={true}
                  pauseOnHover={true}
                  draggable={true}
                  progress={undefined}
              />
        </div>
    );
};

export default TicketPage;