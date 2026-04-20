import React from 'react';
import '../styles/EventItem.css';

function EventItem({ event, onEdit, onDelete, showActions = false }) {
  // 기존 형식(type, name, startDate, endDate) 자동 삭제
  if (!event.person && !event.selectedPeople && event.type && event.startDate) {
    setTimeout(() => onDelete(), 0);
    return null;
  }

  return (
    <div className="event-item off" onClick={() => onEdit && onEdit()}>
      <div className="event-content">
        {event.person ? (
          <span className="person-tag">{event.person}</span>
        ) : event.selectedPeople && event.selectedPeople.length > 0 ? (
          <div className="people-list">
            {event.selectedPeople.map((person) => (
              <span key={person} className="person-tag">{person}</span>
            ))}
          </div>
        ) : (
          <span className="event-name">{event.name || '휴무'}</span>
        )}
      </div>
      <button
        className="btn-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="삭제"
      >
        🗑️
      </button>
    </div>
  );
}

export default EventItem;
