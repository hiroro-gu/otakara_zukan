import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';

export const SearchComponent = ({setSearchTerm}) => {
  const [titleAndTags, setTitleAndTags] = useState([]);

  useEffect(() => {
    client.get('/illustrated_books')
      .then((response) => {
        const data = response.data.data;
        const titleAndTags = data.reduce((acc, item) => {
          acc.push(item.attributes.title);
          item.attributes.tags.forEach(tag => acc.push(tag));
          return acc;
        }, []);
        setTitleAndTags(titleAndTags);
      })
      .catch((error) => {
        console.error('API_request_error', error);
      })
  }, [])
  
  const handleSearchClick = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={titleAndTags}
        noOptionsText={'一致する図鑑が見つかりません'}
        onChange={(e, value) => {handleSearchClick(value);}}
        isOptionEqualToValue={(option, inputValue) => option === inputValue}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};
