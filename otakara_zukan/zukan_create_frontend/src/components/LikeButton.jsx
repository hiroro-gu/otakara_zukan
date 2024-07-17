import { Star, StarBorder } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';
import { IconButton } from '@mui/material';

function LikeButton({ illustratedBookId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    client.get(`/user/likes/${illustratedBookId}`)
    .then((response) => {
      setLiked(response.data.likeExists);
    })
    .catch((error) => {
      console.error('liked_error', error);
    });
  }, [illustratedBookId]);

  const handleLikeClick = () => {
    client.post('/user/likes', { illustrated_book_id: illustratedBookId })
      .then(() => {
        setLiked(!liked);
      })
      .catch((error) => {
        console.error('Like_error', error);
      });
    }

    return (
      <IconButton className='like-button' onClick={handleLikeClick}>
        {liked ? <Star /> : <StarBorder />}
      </IconButton>
    );
  };

export default LikeButton;