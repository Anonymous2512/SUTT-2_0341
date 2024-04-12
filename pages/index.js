import React, { useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import './index.css';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const login = async () => {
    const url = "https://sutt-front-task2-d09a14a7c50b.herokuapp.com";
    try {
      const response = await axios.post(`${url}/auth/login`,
        {
          email: email,
          password: password
        }
      );

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.token);
        setAuthenticated(true);
        setErrorMessage('Signing In');
        setTimeout(() => {
          router.push('/homepage');
        }, 3000);
      } else {
        setErrorMessage('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid Credentials');
      } else {
        setErrorMessage('Error');
      }
    }
  }; 

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div>
      <Header />

      <main>
        <div className="container">
          <div className="col-2">
            <img src="/image1.png" alt="Image" />
          </div>
          <div className="col-2">
            <h2>Empower your schedule,<br />own your time.</h2>
            <p>Revolutionize your daily grind with our scheduler app. Effortlessly organize tasks, reclaim your time, and embrace productivity like never before. </p>
            <div className="login-box">
              <div className="input-container">
                <label htmlFor="email">Enter Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">Enter Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <button className="login" onClick={handleLogin}>Login</button>
              {errorMessage && <p className={errorMessage === 'Signing In' ? 'success-message' : 'error-message'}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
