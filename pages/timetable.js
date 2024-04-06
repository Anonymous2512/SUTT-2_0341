import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftPanel from '../components/LeftPanel';
import HeadPanel from '../components/HeadPanel';
import useActiveButton from '../components/useActiveButton';
import './index.css';
import './homepage.css';
import './timetable.css';

function TimetablePage() {
    const { activeButton, handleButtonClick } = useActiveButton(); 
    const [timetableName, setTimetableName] = useState('');
    const [timetables, setTimetables] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTimetables();
    }, []);

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
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching timetables:', error.message);
            setErrorMessage('Error fetching timetables');
        }
    };

    const handleInputChange = (event) => {
        setTimetableName(event.target.value);
    };

    const handleCreate = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";

        try {
            const response = await axios.post(`${url}/timetables/`, {
                name: timetableName
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log('Timetable created successfully');
            setErrorMessage('Added');
            setTimetableName('');
            fetchTimetables();
        } catch (error) {
            console.error('Error creating timetable:', error.message);
            setErrorMessage('Error');
            setTimeout(() => {
                setErrorMessage('');
              }, 3000);
        }
    };

    const handleRemove = async (id) => {
        const accessToken = localStorage.getItem('accessToken');
        const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";

        try {
            const response = await axios.delete(`${url}/timetables/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log('Timetable removed successfully');
            setErrorMessage('Removed');
            fetchTimetables();
        } catch (error) {
            console.error('Error removing timetable:', error.message);
            setErrorMessage('Error');
        }
    };

    return (
        <div className="container">
            <div className="left-panel">
                <LeftPanel activeButton={activeButton} handleButtonClick={handleButtonClick} />
            </div>
    
            <div className="content">
                <HeadPanel />
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter timetable name"
                        value={timetableName}
                        onChange={handleInputChange}
                    />
                    <button className="create-button" onClick={handleCreate}>
                        <span className="plus-icon">+</span> Create
                    </button>
                    {errorMessage && <p className={errorMessage === 'Added'||errorMessage === 'Removed' ? 'success-message' : 'error-message'}>{errorMessage}</p>}
                </div>
                <h2>Your Timetables</h2>
                <ul className="timetable-list">
                    {timetables.map(timetable => (
                        <div key={timetable._id} className="timetable-item-container">
                           <a href={`/calendar`} className="timetable-item">{timetable.name}</a>
                            <button className="remove" onClick={() => handleRemove(timetable._id)}>Remove</button>
                        </div>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}

export default TimetablePage;
