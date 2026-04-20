import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from './firebase';
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import './App.css';

function App() {
  const { calendarId } = useParams();
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const currentCalendarId = calendarId || 'default';

  useEffect(() => {
    if (!currentCalendarId) return;

    const eventsRef = ref(db, `calendars/${currentCalendarId}/events`);
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        setEvents(snapshot.val());
      } else {
        setEvents({});
      }
    });

    return () => unsubscribe();
  }, [currentCalendarId]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    const eventId = editingEvent?.id || Date.now().toString();
    const eventRef = ref(db, `calendars/${currentCalendarId}/events/${eventId}`);
    set(eventRef, {
      ...eventData,
      id: eventId,
    });
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    const eventRef = ref(db, `calendars/${currentCalendarId}/events/${eventId}`);
    remove(eventRef);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowModal(true);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📅 Shared Calendar</h1>
        <p className="calendar-id">Calendar ID: <code>{currentCalendarId}</code></p>
      </header>

      <main>
        <Calendar
          events={events}
          onDateClick={handleDateClick}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />

        {showModal && (
          <EventModal
            date={selectedDate}
            event={editingEvent}
            onSave={handleSaveEvent}
            onClose={() => setShowModal(false)}
            onDelete={() => editingEvent && handleDeleteEvent(editingEvent.id)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
