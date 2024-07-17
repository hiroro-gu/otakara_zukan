import React, { useEffect, useState } from 'react'
import client from '../../lib/api/client';
import AdminSidebar from './sidebar/AdminSidebar';

export const PostManagement = () => {
  const [illustratedBooks, setIllustratedBooks] = useState([]);

  useEffect(() => {
    client.get('/illustrated_books')
    .then((response) => {
      setIllustratedBooks(response.data.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleDelete = (illustratedBookId) => {
    client.delete(`/illustrated_books/${illustratedBookId}`)
    .then(() =>{
      window.location.reload();
    })
    .catch (error => {
      console.error("削除中にエラーが発生しました: ", error);
    });
  }

  const IllustratedBookList = illustratedBooks.map((illustratedBook) => (
    <tr key={illustratedBook.id}>
      <td>{illustratedBook.id}</td>
      <td>{illustratedBook.attributes.title}</td>
      <button className="button" type="submit" onClick={() => handleDelete(illustratedBook.id)}>
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
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {IllustratedBookList}
        </tbody>
      </table>
    </div>
  );
};
