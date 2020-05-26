import React, { useState } from 'react';
import './App.css';

import Event from './Event.js';


function ViewEvents({ events, setEventsState }){


  return(
    <div>
      <h1>Events</h1>
      {events.map((event, index) => (
        <Event
          index={index}
          events={events}
          setEventsState={setEventsState}
          event={event}
        />
      ))}
    </div>
  )
}

function AddEvent({ events, newEvent, setNewEventState }){
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!newEvent) return; // ?

    if (!(newEvent.date && newEvent.activity)) return;
    let n = newEvent;
    n.id = events.length  + 1;
    events.push(newEvent);
    console.log(newEvent);
    setNewEventState({date: "", activity: ""});
  };

  const handleChange = e => {
    
    let n = newEvent;
    n.activity = e.target.value;console.log(n);
    setNewEventState(n);
  }

  return (
    <div>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Date:   
          <input className="padder" type="date" value={newEvent.date} onChange={e =>setNewEventState({date: e.target.value, activity: newEvent.activity})} />
        </label>
        <label>Event: 
          <input className="padder" type="text" value={newEvent.activity} onChange={e =>setNewEventState({date: newEvent.date, activity: e.target.value})}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

function App() {
  const [events, setEventsState] = useState(eventsDB);
  const [newEvent, setNewEventState] = useState({date: "", activity: ""});

  return (
    <div className="App">
      <AddEvent 
        events={events}
        newEvent={newEvent}
        setNewEventState={setNewEventState}
      />
      <ViewEvents 
        events={events}
        setEventsState={setEventsState}
      />
    </div>
  );
}

const eventsDB = [
  {id: 1, date: "2020-05-06", activity: "Dentist", updating: false },
  {id: 2, date: "2020-06-20", activity: "Go to the beach", updating: false },
  {id: 3,date: "2020-07-29", activity: "Move house", updating: false }
];

export default App;
