import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimetableIcon from '@material-ui/icons/Schedule';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';

function LeftPanel({ activeButton, handleButtonClick }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
 
  };

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
      <button onClick={handleLogout}>
        <ExitToAppIcon /> Logout
      </button>
    </div>
  );
}

export default LeftPanel;
