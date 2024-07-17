import React, { useState } from 'react';
import client from '../../lib/api/client';
import { AddPhotoAlternate, ContentCopy } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export const TextReader = () => {
  const [image, setImage] = useState('');
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState('ファイルが選択されていません');

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name)
    }
  };

  async function fetchEncodedImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await client.post('/analyze_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.responses[0].fullTextAnnotation.text);
      return true;
    } catch (error) {
      console.error('Error', error);
      return false;
    }
  }

  const handleSubmit = async () => {
    if (!image) {
      console.error('No image selected');
      setResult(null);
      return;
    }
    const encodeImage = await fetchEncodedImage(image);
    if (!encodeImage) {
      console.error('failed image download or encpde');
      setResult(null);
      return;
    }
  };

  const copyToClipboard = async() => {
    await global.navigator.clipboard.writeText(result);
  };

  return (
    <div>
      <h1>テキストリーダー</h1>
      <p>解説文や紹介文などの画像から文字を抽出することができます</p>
      <div className='file-container'>
        <label className='file-label'>
          <AddPhotoAlternate />
          ファイルを選択
          <input type="file" className='file-input' onChange={handleChange} />
        </label>
        {fileName && <span>{fileName}</span>}
        <button className='button' onClick={handleSubmit}>テキストを読み込む</button>
      </div>
      <div className='text-preview'>
        {result && 
          <pre className='preview-box'>
            <div className='text-preview-container'>
              {result}
              <Tooltip title="CopyToClipboard" placement='top' arrow>
                <IconButton color='primary' size="small" onClick={() => copyToClipboard()}>
                  <ContentCopy fontSize='small' />
                </IconButton>
              </Tooltip>
            </div>
          </pre>
        }
      </div>
    </div>
  );
}
