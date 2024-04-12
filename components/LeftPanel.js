import React, { useState, useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimetableIcon from '@material-ui/icons/Schedule';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';

function LeftPanel({ activeButton, handleButtonClick }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    alert('You have been logged out.');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        handleLogout();
    }
    if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', handleLogout);
        return () => {
            window.removeEventListener('beforeunload', handleLogout);
        };
    }
}, []);
  return (
    <div className={`${menuOpen ? 'left-panelopen' :'left-panel'}`}>
      {windowWidth <= 600 ? (
        <div className="menu-toggle" onClick={handleToggleMenu}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      ) : null}

      {windowWidth <= 600 ? (
        <div className={`${menuOpen ? 'side-panelopen' :'side-panel'}`}>
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
      ) : (
        <div className="full-panel">
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
      )}
    </div>
  );
}

export default LeftPanel;
