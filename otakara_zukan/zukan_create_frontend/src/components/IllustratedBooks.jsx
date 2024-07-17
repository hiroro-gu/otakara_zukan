import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import client from '../lib/api/client'
import LikeButton from './LikeButton';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import defaultImagePath from '../images/default.webp'
import { SearchComponent } from './SearchComponent';


function IllustratedBooks(){
  const [illustratedBooks, setIllustratedBooks] = useState([]);
  const history = useNavigate();

  const handleSearchResults = async (searchTerm) => {
    try {
      const response = await client.get('/illustrated_books', { params: {search: searchTerm }});
      const data = response?.data?.data;

      if (data && data.length === 0) {
        setIllustratedBooks([]);
      } else if (data) {
        setIllustratedBooks(data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if (illustratedBooks.length === 0) {
      client.get('/illustrated_books')
      .then((response) => {
        setIllustratedBooks(response.data.data)
      })
      .catch((error) => {
        console.error('API_reuest_error', error);
      });
    }
  }, [illustratedBooks.length]);

  const handleSelectIllustratedBook = (illustratedBook) => {
    history(`/illustrated_books/${illustratedBook.id}`);
  };

  return (
    <div className='container'>
    <Sidebar />
      <div className='content'>
        <h1>みんなの図鑑</h1>
          <div className='search'>
            <SearchComponent setSearchTerm={handleSearchResults}/>
          </div>
        <ul className='grid'>
          {illustratedBooks && illustratedBooks.map(illustratedBook => (
            <li key={illustratedBook.id} className='illustrated-book-card'>
              <Box onClick={() => handleSelectIllustratedBook(illustratedBook)}>
                <img src={illustratedBook.attributes.image.url || defaultImagePath} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <p className='title' >{illustratedBook.attributes.title}</p>
              </Box>
              <div className="tags">
                {illustratedBook.attributes.tags.map((tag, index) => (
                  <p key={index} className='tag'>#{tag}</p>
                ))}
              </div>
              <LikeButton illustratedBookId={illustratedBook.id}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IllustratedBooks;