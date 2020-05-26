import React, { useState } from 'react';
import './App.css';

function UpdatingEntry({ index, event, events, setEventsState, deleteEvent }) {
    // This state is so we can update the fields nicely
    const [currentEvent, setCurrentEvent] = useState(event);

    const submit  = (index) => {
        console.log("test");
        // Set currentEvent to correct location in events
        let newEvents = [...events];
        newEvents[index] = currentEvent;
        newEvents[index].updating = false;
        console.log(newEvents);
        setEventsState(newEvents);
    }

    return (
        <p>
            <input className="padder" type="date" value={currentEvent.date} onChange={e => setCurrentEvent({date: e.target.value, activity: currentEvent.activity})} />
            <input className="padder" type="text" value={currentEvent.activity} onChange={e => setCurrentEvent({date: currentEvent.date, activity: e.target.value})} />
            <button className="padder" onClick={() => submit(index)}>Submit</button>
        </p>
    )
}

function Entry({ index, event, deleteEvent, setUpdating }) {

    
    return (
        <p>
            {event.date}: {event.activity}
            <button className="padder" onClick={() => setUpdating(index)}>Update</button>
            <button onClick={() => deleteEvent(index)}>X</button>
        </p>
    )
}

function Event({ index, events, setEventsState, event }) {
  //  const [updating, setUpdating] = useState(false);

    const deleteEvent = index => {
        const newEvents = [...events];
        // Splice (startIndex, items to remove)
        newEvents.splice(index, 1);
        setEventsState(newEvents);
    };

    const setUpdating = index => {
        let newEvents = [...events];
        newEvents[index].updating = !newEvents[index].updating;
        setEventsState(newEvents);
    }

    return (
        <p>
            {event.updating ?
                <UpdatingEntry
                    index={index}
                    event={event}
                    deleteEvent={deleteEvent}
                    events={events}
                    setEventsState={setEventsState}
                /> :
                <Entry
                    index={index}
                    event={event}
                    deleteEvent={deleteEvent}
                    setUpdating={setUpdating}
                />}
        </p>
    );
}

export default Event;