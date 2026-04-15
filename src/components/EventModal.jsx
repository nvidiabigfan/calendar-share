import React, { useState, useEffect } from 'react';
import '../styles/EventModal.css';

function EventModal({ date, event, onSave, onClose }) {
  const [type, setType] = useState(event?.type || '근무');
  const [name, setName] = useState(event?.name || '');
  const [startDate, setStartDate] = useState(event?.startDate || date);
  const [endDate, setEndDate] = useState(event?.endDate || date);

  useEffect(() => {
    if (event) {
      setType(event.type);
      setName(event.name);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      type,
      name,
      date: startDate,
      startDate,
      endDate,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{event ? 'Edit Event' : 'New Event'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type *</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>근무</option>
              <option>휴무</option>
              <option>휴가</option>
            </select>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., 병원 휴가"
            />
          </div>

          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
