import React from 'react';
import LikeButton from './LikeButton';
import { Box } from '@mui/material';
import defaultImagePath from '../images/default.webp'

function Likes({ likes }) {
  return (
    <>
      <ul className='grid'>
        {likes.map(like => (
          <li key={like.id} className='illustrated-book-card'>
            <Box>
              <img src={like.attributes.image.url || defaultImagePath} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              <p className='title'>{like.attributes.title}</p>
            </Box>
            <div className="tags">
                {like.attributes.tags.map((tag, index) => (
                  <p key={index} className='tag'>#{tag}</p>
                ))}
            </div>
            <LikeButton illustratedBookId={like.id} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Likes;