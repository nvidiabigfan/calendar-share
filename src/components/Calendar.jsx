import React, { useState, useMemo } from 'react';
import KoreanHolidays from 'korean-holidays';
import EventItem from './EventItem';
import '../styles/Calendar.css';

// 선거일 (공휴일 아님, 휴무)
const ELECTION_DAYS = {
  '2026-04-15': '총선',
  '2026-06-03': '지방선거',
};

function Calendar({ events, onDateClick, onEditEvent, onDeleteEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();

  const holidayMap = useMemo(() => {
    const map = {};
    const holidays = KoreanHolidays.getHolidays(year);
    holidays.forEach(holiday => {
      const date = new Date(holiday.date);
      const offset = -date.getTimezoneOffset() * 60000;
      const localDate = new Date(date.getTime() + offset);
      const dateStr = localDate.toISOString().split('T')[0];
      map[dateStr] = holiday.nameKo;
    });
    // 선거일 추가
    Object.entries(ELECTION_DAYS).forEach(([dateStr, name]) => {
      map[dateStr] = name;
    });
    return map;
  }, [year]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isHoliday = (dateStr) => {
    return holidayMap[dateStr] !== undefined;
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
