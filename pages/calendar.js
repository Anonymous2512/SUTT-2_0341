import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import LeftPanel from '../components/LeftPanel';
import HeadPanel from '../components/HeadPanel';
import useActiveButton from '../components/useActiveButton';
import AddIcon from '@material-ui/icons/Add';
import './index.css';
import './homepage.css';
import "./timetable.css";
import './calendar.css';

function CalendarPage() {
    const { activeButton, handleButtonClick } = useActiveButton();
    const [timetableId, setTimetableId] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [timetables, setTimetables] = useState([]);
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [createClicked, setCreateClicked] = useState(false);
    const router = useRouter();

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
    }, [accessToken]);

    const handleTimetableChange = async (event) => {
        const selectedTimetableId = event.target.value;
        setTimetableId(selectedTimetableId);
        
        const accessToken = localStorage.getItem('accessToken');
        const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";
        try {
            const response = await axios.get(`${url}/timetables/${event.target.value}/events/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    };

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    };

    const handleEventStartDateChange = (event) => {
        setEventStartDate(event.target.value);
    };

    const handleEventEndDateChange = (event) => {
        setEventEndDate(event.target.value);
    };

    const handleRemoveEvent = async (eventId) => {
        const accessToken = localStorage.getItem('accessToken');
        const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";
  
        try {
            const response = await axios.delete(`${url}/timetables/${timetableId}/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
  
            setErrorMessage('Removed');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
         
            const updatedEvents = events.filter(event => event._id !== eventId);
            setEvents(updatedEvents);
        } catch (error) {
            console.error('Error removing event:', error);
            setErrorMessage('Error');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const handleAddEvent = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";
        try {
            const eventData = {
                name: eventName,
                startTime: eventStartDate,
                endTime: eventEndDate
            };

            const response = await axios.post(`${url}/timetables/${timetableId}/events/`, eventData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            console.log('Event added successfully:', response.data);
            setEventName('');
            setEventStartDate('');
            setEventEndDate('');
            setErrorMessage('Added');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            setCreateClicked(false);
            const eventsResponse = await axios.get(`${url}/timetables/${timetableId}/events/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setEvents(eventsResponse.data);
        } catch (error) {
            console.error('Error adding event:', error);
            setErrorMessage('Error');
            setCreateClicked(false);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
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
                        <select value={timetableId} onChange={handleTimetableChange}>
                            <option value="">Select a timetable</option>
                            {timetables.map(timetable => (
                                <option key={timetable._id} value={timetable._id}>{timetable.name}</option>
                            ))}
                        </select>
                    </div>
                    {errorMessage && <p className={errorMessage === 'Added'||errorMessage === 'Removed'? 'success-message' : 'error-message'}>{errorMessage}</p>}
                </div>

                {timetableId && (
                    <>
                        <br />
                        {!createClicked && (
                            <div className='button-container'>
                                <button className='create-event-button' onClick={() => setCreateClicked(true)}>
                                    <AddIcon className="plus-icon" />
                                    Create New Event
                                </button>
                            </div>
                        )}
                        {createClicked && (
                            <div className="event-input-container">
                                <input type="text" placeholder="Event Name" value={eventName} onChange={handleEventNameChange} />
                                <input type="text" placeholder="Event Start Date(yyyy-mm-dd)" value={eventStartDate} onChange={handleEventStartDateChange} />
                                <input type="text" placeholder="Event End Date(yyyy-mm-dd)" value={eventEndDate} onChange={handleEventEndDateChange} />
                                <button className='add-event' onClick={handleAddEvent}>Add Event</button>
                            </div>
                        )}
                        <h3>Events:</h3>
                        <div className="events-container">
                            {events.map(event => (
                                <div key={event._id} className="event-container">
                                    <div className="event-box">
                                        <p><strong>Name:</strong> {event.name}</p>
                                        <p><strong>From:</strong> {event.startTime.slice(0,10)}</p>
                                        <p><strong>To:</strong> {event.endTime.slice(0,10)}</p>
                                    </div>
                                    <div className="remove-button-container">
                                        <button onClick={() => handleRemoveEvent(event._id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CalendarPage;
