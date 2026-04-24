import React, { useState } from 'react';
import EventItem from './EventItem';
import '../styles/Calendar.css';

const HOLIDAYS = {
  '2026-01-01': '새해',
  '2026-02-12': '설',
  '2026-02-13': '설',
  '2026-02-14': '설',
  '2026-03-01': '삼일절',
  '2026-04-15': '총선',
  '2026-05-05': '어린이날',
  '2026-05-15': '부처님오신날',
  '2026-06-06': '현충일',
  '2026-08-15': '광복절',
  '2026-09-24': '추석',
  '2026-09-25': '추석',
  '2026-09-26': '추석',
  '2026-10-03': '개천절',
  '2026-10-09': '한글날',
  '2026-12-25': '크리스마스',
};

function Calendar({ events, onDateClick, onEditEvent, onDeleteEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isHoliday = (dateStr) => {
    return HOLIDAYS[dateStr] !== undefined;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateStr) => {
    return Object.values(events).filter(event => event.date === dateStr) || [];
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  // 월요일부터 시작 (일요일=0, 월요일=1, ..., 토요일=6)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  // 첫 주의 월요일 이전 빈 셀
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }

  // 각 날짜 추가 (토/일 제외)
  for (let i = 1; i <= daysInMonth; i++) {
    const dayOfWeek = (adjustedFirstDay + i - 1) % 7;
    // 토요일(5) 또는 일요일(6, 조정됨)이 아닌 경우만 추가
    if (dayOfWeek < 5) {
      days.push(i);
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{monthName}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      <div className="weekdays">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="empty-day"></div>;
          }

          const dateStr = formatDateKey(year, month, day);
          const dayEvents = getEventsForDate(dateStr);

          return (
            <div
              key={day}
              className={`day-cell ${isHoliday(dateStr) ? 'holiday' : ''}`}
              onClick={() => onDateClick(dateStr)}
            >
              <div className="day-number">{day}</div>
              <div className="events-list">
                {dayEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onEdit={() => onEditEvent(event)}
                    onDelete={() => onDeleteEvent(event.id)}
                    showActions={false}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
