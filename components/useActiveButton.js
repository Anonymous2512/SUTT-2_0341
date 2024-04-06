import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 

const useActiveButton = () => {
  const router = useRouter(); 
  const [activeButton, setActiveButton] = useState('home'); 

  useEffect(() => {
    const path = router.pathname;
    if (path === '/homepage') {
      setActiveButton('home');
    } else if (path === '/calendar') {
      setActiveButton('calendar');
    } else if (path === '/timetable') {
      setActiveButton('timetable');
    }
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'home') {
      router.push('/homepage');
    } else if (button === 'calendar') {
      router.push('/calendar');
    } else if (button === 'timetable') {
      router.push('/timetable');
    }
  };

  return { activeButton, handleButtonClick };
};

export default useActiveButton;
