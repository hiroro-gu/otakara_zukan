import React, { useEffect, useState } from 'react'
import client from '../../lib/api/client';
import AdminSidebar from './sidebar/AdminSidebar';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (userId) => {
    client.delete(`/users/${userId}`)
    .then(() =>{
      window.location.reload();
    })
    .catch (error => {
      console.error("削除中にエラーが発生しました: ", error);
    });
  }

  const userList = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.role}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.createdAt}</td>
      <button className="button" type="submit" onClick={() => handleDelete(user.id)}>
        Delete
      </button>
    </tr>
  ));

  return (
    <div className='container'>
      <AdminSidebar />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created_at</th>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    </div>
  );
};