import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';
import Icon from '../../images/top.webp'

function SidebarIcon() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
      client.get('/current_user')
        .then(response => {
          setUserName(response.data.name);
        })
        .catch(error => {
          console.error('Error fetching user data:', error.response)
        })
      }
  }, [localStorage.getItem('access_token')]);

  return (
    <div className='SidebarIcon'>
      <img src={Icon} alt='icon' />
      <p>{userName}</p>
    </div>
  );
}

export default SidebarIcon;