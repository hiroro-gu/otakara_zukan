import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import MyIllustratedBooks from './MyIllustratedBooks';
import Likes from './Likes';
import client from '../lib/api/client';
import { SearchComponent } from './SearchComponent';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [activeTab, setActiveTab] = useState('illustrated_books');
  const [illustratedBooks, setIllustratedBooks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    if (userRole === 'guest'){
      history('/signup', {state: { flashMessage: 'ユーザー登録が必要です' }});
    }
  }, [history])

  const handleSearchResults = async (searchTerm) => {
    try {
      const response = await client.get('/user/illustrated_books', { params: {search: searchTerm }});
      const data = response.data.data;

      if (data.length === 0) {
        setFlashMessage('お探しの図鑑は見つかりませんでした。')
      } else {
        setFlashMessage('');
      }

      setIllustratedBooks(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClose = () => {
    setFlashMessage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (illustratedBooks.length === 0) {
          const illustratedBooksResponse = await client.get('/user/illustrated_books');
          setIllustratedBooks(illustratedBooksResponse.data.data);
        }
  
        const likesResponse = await client.get('/user/likes');
        setLikes(likesResponse.data.data);
      } catch (error) {
        console.error('API_request_error', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className='content'>
        <div className='tabs'>
          <button
            onClick={() => handleTabChange('illustrated_books')}
            className={activeTab === 'illustrated_books' ? 'active' : ''}
          >
            図鑑一覧
          </button>
          <button
            onClick={() => handleTabChange('likes')}
            className={activeTab === 'likes' ? 'active' : ''}
          >
            お気に入り一覧
          </button>
        </div>
          {activeTab === 'illustrated_books' && (
            <>
              <div className='search'>
                <SearchComponent setSearchTerm={handleSearchResults}/>
                <Snackbar open={!!flashMessage} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}autoHideDuration={6000}>
                  <Alert severity="info" sx={{ width: '100%' }}>
                    {flashMessage}
                  </Alert>
                </Snackbar>
              </div>
              <MyIllustratedBooks illustratedBooks={illustratedBooks} />
            </>
          )}
          {activeTab === 'likes' && <Likes likes={likes} />}
      </div>
    </div>
  );
}

export default MyPage;