import React, { useEffect, useState, useRef } from 'react'
import Sidebar from './sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../lib/api/client';
import { useDraggableAreaSize } from './customHooks/useDraggableAreaSize';
import { Box } from '@mui/material';
import useResizable from './customHooks/useResizable';
import useDraggable from './customHooks/useDraggable';
import { TagInput } from './TagInput';

export const UpdateIllustratedBook = () => {
  let { id } = useParams();
  const [illustratedBook, setIllustratedBook] = useState(null);
  const [title, setTitle] = useState('');
  const [template, setTemplate] = useState(null)
  const [usedFileds, setUsedFields] = useState([]);
  const [tags, setTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);
  const templateRef = useRef(null);
  const history = useNavigate();
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });


  const onAreaSize = (size) => {
    setAreaSize(size);
  }
  useDraggableAreaSize(templateRef, onAreaSize)

  const handleUpdateSize = (id, width, height) => {
    const updateSize = illustratedBook.illustratedBookFieldDesigns.map((design) => {
      if (design.id.toString() === id.toString()) {
      return {
        ...design,
        width: width / areaSize.width,
        height: height / areaSize.height,
        };
      }
      return design;
    });

    setIllustratedBook((prevIllustratedBook) => ({
      ...prevIllustratedBook,
      illustratedBookFieldDesigns: updateSize
    }))
  };
  useResizable('.field-card-text', handleUpdateSize)

  const handleUpdatePosition = (id, x, y) => {
    if (id === null) {
      setIllustratedBook((prevIllustratedBook) => ({
        ...prevIllustratedBook,
        imageXPosition: x / areaSize.width,
        imageYPosition: y / areaSize.height,
      }));
      } else {
        const updatePosition = illustratedBook.illustratedBookFieldDesigns.map((design) => {
          if (design.id.toString() === id.toString()) {
          return {
            ...design,
            xPosition: x / areaSize.width,
            yPosition: y / areaSize.height,
            };
          }
          return design;
        });

      setIllustratedBook((prevIllustratedBook) => ({
        ...prevIllustratedBook,
        illustratedBookFieldDesigns: updatePosition
      }))
    }
  };
  useDraggable('.field-card', handleUpdatePosition)


  useEffect(() => {
    const fetchIllustratedBook = async () => {
      try {
        const response = await client.get(`/illustrated_books/${id}`);
        const illustratedBookData = response.data.data;
        const { attributes, relationships } = illustratedBookData;
  
        setIllustratedBook({
          ...attributes,
          relationships,
        });
  
        setTitle(attributes.title);
        setTemplate(relationships.template);
        setExistingTags(illustratedBookData.attributes.tags);
        setTags(illustratedBookData.attributes.tags);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchIllustratedBook();
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    const id = parseInt(e.target.dataset.id, 10);
    const newContent = e.target.value;
    setIllustratedBook(prevIllustratedBook => {
      const updatedFieldDesigns = prevIllustratedBook.illustratedBookFieldDesigns.map(design => {
        if (design.id === id) {
          return { ...design, content: newContent };
        }
        return design;
      });
      return { ...prevIllustratedBook, illustratedBookFieldDesigns: updatedFieldDesigns };
    });
  };

  const handleReset = (id) => {
    setIllustratedBook((prevIllustratedBook) => {
      const updatedFieldDesigns = prevIllustratedBook.illustratedBookFieldDesigns.filter(
        (design) => design.id !== id
      );
      
      return {
        ...prevIllustratedBook,
        illustratedBookFieldDesigns: updatedFieldDesigns
      };
    });
  };

  const onTagStrChange = (a) => {
    setTags(a)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contents = illustratedBook.illustratedBookFieldDesigns.map(design => ({
      id: design.id,
      field_design_id: design.fieldDesignId,
      content: design.content,
      height: design.height,
      width: design.width,
      x_position: design.xPosition,
      y_position: design.yPosition,
    }));

    const illustratedBookFieldDesignsAttributes = [...contents, ]

    try {
      const params = {
        tags: tags,
        illustrated_book: {
          title: title,
          template_id: template.id,
          image_x_position: illustratedBook.imageXPosition,
          image_y_position: illustratedBook.imageYPosition,
          illustrated_book_field_designs_attributes: illustratedBookFieldDesignsAttributes,
        }
      }

      await client.put(`/user/illustrated_books/${id}`, params)
      history(`/illustrated_books/${id}`);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <Sidebar />
      <div className='content-create'>
        <form>
          <input             
            type="text"
            placeholder="Japanes Name"
            onChange={(e) => handleTitleChange(e)}
            value={title}
          />

          <div className="draggable-area" ref={templateRef}>

            {illustratedBook.image.url &&
              <Box
                className='field-card'
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
              <ul>
                {showPost.map((object, index) => (
                  <li key={index} data-id={object.illustratedBook.id} className='field-card' style={{ position: 'absolute', top: object.illustratedBook.yPosition * areaSize.height, left: object.illustratedBook.xPosition * areaSize.width }} >
                    <label>{object.fieldDesign.attributes.label}</label>
                    <textarea
                      data-id={object.illustratedBook.id}
                      type="text"
                      className='field-card-text'
                      value={object.illustratedBook.content}
                      onChange={(e) => handleTextChange(e)}
                      style={{
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
                    <button type="button" onClick={() => handleReset(object.illustratedBook.id)}>x</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <TagInput onTagStrChange={onTagStrChange} existingTags={existingTags} />
          <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>
            投稿
          </button>
        </form>
      </div>
    </div>
  )
}
