import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RegistrationPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
try{
    // check the email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
    }
    if(password.length<6){
      alert("Password must be at least 6 characters long");
    }

    if(name.length<3){
      alert("Name must be at least 3 characters long");
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (response.status === 201) {
      // Registration successful
      alert(data.message);
      console.log('Registration successful');
    } else {
      // Registration failed
      alert(data.message);
      console.log('Registration failed');
    }
}
catch(error){
  console.log(error);
  alert("Registration failed");
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;