import { Share } from '@mui/icons-material'
import React from 'react'

export const XShareButton = ({title, id}) => {
  const postText = encodeURIComponent(`図鑑クリエイトで「${title}」の図鑑を作ったよ！`);
  const serviceUrl = `https://www.illustrated-books-create.com/illustrated_books/${id}`;
  const XUrl = `https://twitter.com/intent/tweet?text=${postText}&url=${serviceUrl}`;

  return (
    <div>
      <a
        href={XUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Share style={{color: 'gray', margin: '8px 0 0 8px'}}/>
      </a>
    </div>
  )
}
