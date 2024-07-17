import React, { useEffect, useState, useRef } from 'react'
import Sidebar from './sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../lib/api/client';
import { useDraggableAreaSize } from './customHooks/useDraggableAreaSize';
import { Box } from '@mui/material';

export const ShowIllustratedBook = () => {
  let { id } = useParams();
  const [illustratedBook, setIllustratedBook] = useState(null);
  const [usedFileds, setUsedFields] = useState([]);
  const templateRef = useRef(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });
  const history = useNavigate(null);

  const onAreaSize = (size) => {
    setAreaSize(size);
  }
  useDraggableAreaSize(templateRef, onAreaSize)

  useEffect(() => {
    client.get(`/illustrated_books/${id}`)
    .then((response) => {
      setIllustratedBook(response.data.data.attributes)
    })
    .catch((error) => {
      console.error(error);
    });
  }, [id]);

  useEffect(() => {
    if (illustratedBook && illustratedBook.illustratedBookFieldDesigns) {
      Promise.all(illustratedBook.illustratedBookFieldDesigns.map(obj =>
        client.get(`/field_designs/${obj.fieldDesignId}`).then(response => response.data.data)
      ))
      .then((responses) => {
        setUsedFields(responses)
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [illustratedBook]);

  if (!illustratedBook || !illustratedBook.illustratedBookFieldDesigns) {
    return <div>Loading...</div>;
  }

  const showPost = illustratedBook.illustratedBookFieldDesigns.map((design) => {
    const fieldDesign = usedFileds.find((field) => field.id === design.fieldDesignId.toString());
    if (fieldDesign) {
      return {
        illustratedBook: {
        ...design,
        },
        fieldDesign: {
          attributes: { ...fieldDesign.attributes }
        }
      };
    } else {
      return null;
    }
  }).filter(item => item !== null);

  const goBack = () => {
    history(-1);
  }

  return (
    <div className='container'>
      <Sidebar />
      <div className='content-create'>
        <div className="draggable-area" ref={templateRef}>
          {illustratedBook.image.url &&
            <Box
              style={{
                position: 'absolute',
                top: illustratedBook.imageYPosition * areaSize.height,
                left: illustratedBook.imageXPosition * areaSize.width,  
                maxHeight: '40%',
                maxWidth: '40%',
              }}
            >
              <img 
                src={illustratedBook.image.url} 
                alt='img'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          }
          {showPost && (
            <ul style={{display: 'flex'}}>
              {showPost.map((object, index) => (
                <li key={index} className='field-card' style={{ position: 'absolute', top: object.illustratedBook.yPosition * areaSize.height, left: object.illustratedBook.xPosition * areaSize.width }} >
                  <label>{object.fieldDesign.attributes.label}</label>
                  <textarea
                    type="text"
                    className='field-card-text'
                    readOnly
                    defaultValue={object.illustratedBook.content}
                    style={{
                      resize: 'none',
                      backgroundColor: object.fieldDesign.attributes.backgroundColor,
                      color: object.fieldDesign.attributes.color,
                      borderColor: object.fieldDesign.attributes.borderColor,
                      borderStyle: object.fieldDesign.attributes.borderStyle,
                      borderRadius: parseInt(object.fieldDesign.attributes.borderRadius, 10),
                      fontFamily: object.fieldDesign.attributes.fontFamily,
                      fontSize: parseInt(object.fieldDesign.attributes.fontSize, 10),
                      width: object.illustratedBook.width * areaSize.width,
                      height: object.illustratedBook.height * areaSize.height,
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type='button' className='button' onClick={goBack} >戻る</button>
      </div>
    </div>
  )
}