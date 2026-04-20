import React, { useState, useEffect } from 'react';
import '../styles/EventModal.css';

const PEOPLE = ['천배', '형렬', '민수', '병진', '승민'];

function EventModal({ date, event, onSave, onClose }) {
  const [selectedPeople, setSelectedPeople] = useState(event?.selectedPeople || []);
  const [eventDate, setEventDate] = useState(event?.date || date);

  useEffect(() => {
    if (event) {
      setSelectedPeople(event.selectedPeople || []);
      setEventDate(event.date);
    }
  }, [event]);

  const handlePeopleToggle = (person) => {
    setSelectedPeople((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPeople.length === 0) {
      alert('최소 한 명은 선택해주세요');
      return;
    }

    // 각 사람마다 별도의 이벤트로 저장
    selectedPeople.forEach((person) => {
      onSave({
        type: '휴무',
        person,
        date: eventDate,
        startDate: eventDate,
        endDate: eventDate,
      });
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{event ? 'Edit Event' : 'New Event'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>누가 쉬나요? *</label>
            <div className="people-selector">
              {PEOPLE.map((person) => (
                <button
                  key={person}
                  type="button"
                  className={`people-btn ${selectedPeople.includes(person) ? 'selected' : ''}`}
                  onClick={() => handlePeopleToggle(person)}
                >
                  {person}
                </button>
              ))}
            </div>
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
