import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftPanel from '../components/LeftPanel';
import HeadPanel from '../components/HeadPanel';
import './index.css';
import './timetable.css';
import './calendar.css';
import './homepage.css';
import useActiveButton from '../components/useActiveButton';

function HomePage() {
    const { activeButton, handleButtonClick } = useActiveButton();
    const [timetables, setTimetables] = useState([]);
    const [selectedTimetableId, setSelectedTimetableId] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTimetables = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";

            try {
                const response = await axios.get(`${url}/timetables/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setTimetables(response.data);
            } catch (error) {
                console.error('Error fetching timetables:', error.message);
            }
        };
        fetchTimetables();
    }, []);

    useEffect(() => {
        if (selectedTimetableId) {
            const fetchEvents = async () => {
                const accessToken = localStorage.getItem('accessToken');
                const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";
                
                try {
                    const response = await axios.get(`${url}/timetables/${selectedTimetableId}/events/`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    setEvents(response.data);
                } catch (error) {
                    console.error('Error fetching events:', error.message);
                }
            };
            fetchEvents();
        }
    }, [selectedTimetableId]);

    const handleTimetableChange = (event) => {
        setSelectedTimetableId(event.target.value);
    };

    const filterEventsForToday = () => {
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0];
        const filteredEvents = events.filter(event => {
            const eventStartDate = new Date(event.startTime);
            const eventEndDate = new Date(event.endTime);
            return todayDate >= eventStartDate.toISOString().split('T')[0] && todayDate <= eventEndDate.toISOString().split('T')[0];
        });
        return filteredEvents;
    };

    return (
        <div className="container">
            <div className="left-panel">
                <LeftPanel activeButton={activeButton} handleButtonClick={handleButtonClick} />
            </div>
            <div className="content">
                <HeadPanel />
                <div className="timetable-select-container">
                    <p>Select a timetable:</p>
                    <div className="select-container">
                        <select value={selectedTimetableId} onChange={handleTimetableChange}>
                            <option value="">Select a timetable</option>
                            {timetables.map(timetable => (
                                <option key={timetable._id} value={timetable._id}>{timetable.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {selectedTimetableId && (
                    <>
                          <h3>Events For Today:</h3>
                          {filterEventsForToday().length > 0 ? (
                                <ul>
                                  {filterEventsForToday().map(event => (
                                <div key={event._id} className="event-item">
                                <p><strong>Name:</strong> {event.name}</p>
                                <p><strong>From:</strong> {event.startTime.slice(0,10)}</p>
                                  <p><strong>To:</strong> {event.endTime.slice(0,10)}</p>
                                        </div>
                                     ))}
    </ul>

) : (
  <p>NO Events Scheduled For Today</p>
)}
                      
                    </>
                )}
            </div>
        </div>
    );
}

export default HomePage;
