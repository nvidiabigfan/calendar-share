import React from 'react';
import '../styles/EventItem.css';

function EventItem({ event, onEdit, onDelete, showActions = false }) {
  // 기존 형식(type, name, startDate, endDate) 자동 삭제
  if (!event.selectedPeople && event.type && event.startDate) {
    setTimeout(() => onDelete(), 0);
    return null;
  }

  const getShortName = (name) => {
    const shortMap = {
      '천배': '천',
      '형렬': '형',
      '민수': '민',
      '병진': '진',
      '승민': '민',
    };
    return shortMap[name] || name.charAt(0);
  };

  return (
    <div className={`event-item off`} onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }}>
      <div className="event-content">
        {event.selectedPeople && event.selectedPeople.length > 0 ? (
          <div className="people-list">
            {event.selectedPeople.map((person) => (
              <span key={person} className="person-tag">{getShortName(person)}</span>
            ))}
          </div>
        ) : (
          <span className="event-name">{event.name || '휴무'}</span>
        )}
      </div>
      {showActions && (
        <div className="event-actions">
          <button className="btn-delete" onClick={(e) => { e.stopPropagation(); onDelete(); }}>🗑️</button>
        </div>
      )}
    </div>
  );
}

export default EventItem;
