import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { API_URL } from '../config'

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        // Redirect to home page
        console.log("response status is 200")
        if(data?.user.userID && data?.user?.email === email){
          console.log("response has user data");

          localStorage.setItem('userID', data?.user.userID);
          localStorage.setItem('email', data?.user.email);
          localStorage.setItem('name', data?.user.name);
          localStorage.setItem('accessToken', data?.accessToken);
          localStorage.setItem('refreshToken', data?.refreshToken);
          router.push('/');
        }
        else{
          console.log("response do not have user data")
          alert('Error logging in');
        }
      }
      else{
        console.log("response status is not 200")
        alert('Unable to login at this moment. Please try again later.');
      }
    } catch (error) {
      // Handle error here
      console.log("error in login")
      console.error(error);
      alert('Error logging in');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!(accessToken === null || accessToken === undefined) && !(refreshToken === null || refreshToken === undefined)) {
      router.push('/');
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;