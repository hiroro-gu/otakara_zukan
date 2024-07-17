import React, { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelIcon from '@mui/icons-material/Cancel';
import useDraggable from './customHooks/useDraggable';

export const ImagePreviewer = ({ imageFile, onReset, inputRef, imagePosition, onUpdatePosition}) => {
  useDraggable('.field-card', onUpdatePosition);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (imageFile && imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (readEvent) => {
        setPreview(readEvent.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);
  

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onReset();
  };

  return (
    <>
      {preview ? (
        <Box
          className='field-card'
          style={{
            position: 'absolute',
            top: imagePosition.y,
            left: imagePosition.x,
            maxHeight: '40%',
            maxWidth: '40%',
          }}
        >
          <img src={preview} alt='Preview' />
          <IconButton color="inherit" onClick={handleReset}>
            <CancelIcon />
          </IconButton>
        </Box>
      ) : null}
    </>
  );
};

export const ImageForm = ({ setImage, inputRef }) => {

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <label htmlFor="upload-button">
        <input
          type='file'
          id="upload-button"
          className='file-input'
          accept='image/*'
          ref={inputRef}
          onChange={onFileChange}
        />
        <IconButton color="inherit" component="span">
          <AddAPhotoIcon />
        </IconButton>
      </label>
    </>
  );
};