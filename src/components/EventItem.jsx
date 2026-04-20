import React from 'react';
import '../styles/EventItem.css';

function EventItem({ event, onEdit, onDelete, showActions = false }) {
  return (
    <div className="event-item off">
      <div className="event-content">
        {event.selectedPeople && event.selectedPeople.length > 0 ? (
          <div className="people-list">
            {event.selectedPeople.map((person) => (
              <span key={person} className="person-tag">{person}</span>
            ))}
          </div>
        ) : (
          <span className="event-name">{event.name || '휴무'}</span>
        )}
      </div>
      {showActions && (
        <div className="event-actions">
          <button className="btn-edit" onClick={(e) => { e.stopPropagation(); onEdit(); }}>✏️</button>
          <button className="btn-delete" onClick={(e) => { e.stopPropagation(); onDelete(); }}>🗑️</button>
        </div>
      )}
    </div>
  );
}

export default EventItem;
