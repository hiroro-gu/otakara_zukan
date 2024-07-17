import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from './lib/api/client';

export function RequireAdmin({ children }) {
  const [user, setUser] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      client.get('/current_user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error.response)
      })
    }
  }, [localStorage.getItem('access_token')]);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      history("/login");
    }
  }, [user, history]);
  
  return children;
}