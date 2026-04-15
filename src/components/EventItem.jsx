import React from 'react';
import '../styles/EventItem.css';

function EventItem({ event, onEdit, onDelete, showActions = false }) {
  const getTypeColor = (type) => {
    switch (type) {
      case '근무':
        return 'work';
      case '휴무':
        return 'off';
      case '휴가':
        return 'vacation';
      default:
        return 'default';
    }
  };

  return (
    <div className={`event-item ${getTypeColor(event.type)}`}>
      <div className="event-content">
        <span className="event-type">{event.type}</span>
        {event.name && <span className="event-name">{event.name}</span>}
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
