import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimetableIcon from '@material-ui/icons/Schedule';

function LeftPanel({ activeButton, handleButtonClick }) {
  return (
    <div className="left-panel">
      <h1>Scheduler</h1>
      <button className={activeButton === 'home' ? 'active' : ''} onClick={() => handleButtonClick('home')}>
        <HomeIcon /> Home
      </button>
      <button className={activeButton === 'calendar' ? 'active' : ''} onClick={() => handleButtonClick('calendar')}>
        <CalendarIcon /> Calendar
      </button>
      <button className={activeButton === 'timetable' ? 'active' : ''} onClick={() => handleButtonClick('timetable')}>
        <TimetableIcon /> Timetable
      </button>
    </div>
  );
}

export default LeftPanel;
