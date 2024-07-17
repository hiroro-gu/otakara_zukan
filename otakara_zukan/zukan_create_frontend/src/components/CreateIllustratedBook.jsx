import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import client from '../lib/api/client';
import AddField from './AddField';
import AddTemplate from './AddTemplate';
import { v4 as uuidv4 } from 'uuid';
import { useDraggableAreaSize } from './customHooks/useDraggableAreaSize';
import { ImageForm, ImagePreviewer } from './ImageForm';
import Modal from './modal/Modal';
import { TagInput } from './TagInput';

export const CreateIllustratedBook = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [template, setTemplate] = useState(null)
  const history = useNavigate();
  const templateRef = useRef(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const inputRef = useRef(null);

  const onAreaSize = (size) => {
    setAreaSize(size);
  }
  useDraggableAreaSize(templateRef, onAreaSize)

  const handleAddInput = (inputData) => {
    const uuid = uuidv4();
    setInputs((prevInputs) => [
      ...prevInputs,
      { ...inputData, x: 0, y: 0, width: 162, height: 42, uuid: uuid },
    ]);
  };

  const handleAddTemplate = (templateData) => {
    setTemplate(templateData);
  };

  const handleUpdateTemplate = (newInputs) => {
    setTemplate(newInputs)
  };

  const updateInputPosition = (uuid, x, y) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, x, y};
        }
        return input;
      });
    });
  };

  const removeItem = (uuid) => {
    setInputs((prevInputs) => {
      const updateInputs = prevInputs.filter((input) => input.uuid !== uuid);
      return updateInputs;
    });
  };

  const updateInputSize = (uuid, width, height) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, width, height };
        }
        return input;
      });
    });
  };

  const updateTemplatePosition = (uuid, x, y) => {
    setTemplate((prevTemplate) => {
      if (prevTemplate && prevTemplate.fieldDesigns !== null) {
        const updatedFieldDesigns = prevTemplate.fieldDesigns.map((fieldDesign) => {
          if (fieldDesign.uuid === uuid) {
            return {
              ...fieldDesign,
              positionAndSize: {
                attributes: {
                  ...fieldDesign.positionAndSize.attributes,
                  xPosition: x / areaSize.width,
                  yPosition: y / areaSize.height,
                }
              }
            };
          }
          return fieldDesign;
        });
        return {
          ...prevTemplate,
          fieldDesigns: updatedFieldDesigns,
        };
      } else {
        return prevTemplate;
      }
    });
  };

  const updateTemplateSize = (uuid, width, height) => {
    setTemplate((prevTemplate) => {
      if (prevTemplate && prevTemplate.fieldDesigns !== null) {
        const updatedFieldDesigns = prevTemplate.fieldDesigns.map((fieldDesign) => {
          if (fieldDesign.uuid === uuid) {
            return {
              ...fieldDesign,
              positionAndSize: {
                attributes: {
                  ...fieldDesign.positionAndSize.attributes,
                  width: width / areaSize.width,
                  height: height / areaSize.height,
                }
              }
            };
          }
          return fieldDesign;
        });
  
        return {
          ...prevTemplate,
          fieldDesigns: updatedFieldDesigns,
        };
      } else {
        return prevTemplate;
      }
    });
  };

  const onFieldContent = (uuid, value) => {
    if (inputs) {
      setInputs((prevInputs) => {
        return prevInputs.map((input) => {
          if (input.uuid === uuid) {
            return { ...input, content: value };
          }
          return input;
        });
      });
    }

    if (template) {
      setTemplate((prevTemplate) => {
        const updateContent = prevTemplate.fieldDesigns.map((fieldDesign) => {
          if (fieldDesign.uuid === uuid) {
            return { ...fieldDesign, content: value };
          }
          return fieldDesign;
        });
        return {
          ...prevTemplate,
          fieldDesigns: updateContent
        }
      })
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let templateAttributes = [];
      if (template && template.fieldDesigns) {
        templateAttributes = template.fieldDesigns.map(fieldDesign => {
          const attributes = {
            field_design_id: fieldDesign.id,
            content: fieldDesign.content,
            height: fieldDesign.positionAndSize.attributes.height,
            width: fieldDesign.positionAndSize.attributes.width,
            x_position: fieldDesign.positionAndSize.attributes.xPosition,
            y_position: fieldDesign.positionAndSize.attributes.yPosition,  
          };
          return attributes;
        });
      }

      const inputAttributes = inputs.map(input => {
        const attributes = {
          field_design_id: input.id,
          content: input.content,
          height: input.height / areaSize.height,
          width: input.width / areaSize.width,
          x_position: input.x / areaSize.width,
          y_position: input.y / areaSize.height,
        };
        return attributes;
      });

      const contentAttributes = [...templateAttributes, ...inputAttributes];
      
      const generateParams = {
        tags: tags,
        illustrated_book: {
          title: title,
          image: image,
          image_x_position: imagePosition.x / areaSize.width,
          image_y_position: imagePosition.y / areaSize.height,
          template_id: template && template.id ? template.id : 1,
          illustrated_book_field_designs_attributes: contentAttributes,
        }
      }

      await client.post('/user/illustrated_books', generateParams, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setTitle("");
      setTags([]);
      setInputs([]);
      setTemplate(null);
      setImage(null);
      setImagePosition({ x: 0, y: 0 })
      history("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  const resetPreview = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setImage(null);
  };

  const updateImagePosition = (uuid, x, y) => {
    if (uuid === null) {
      setImagePosition({ x: x, y: y });
    }
  };

  const onTagStrChange = (a) => {
    setTags(a)
  }


  return (
    <div className='container'>
      <Sidebar />
      <div className='content-create'>
        <form>
          <Modal  onAddInput={handleAddInput} onAddTemplate={handleAddTemplate} />
          <ImageForm setImage={setImage} inputRef={inputRef} />
          <input
            type="text"
            placeholder="生き物の種類を入れてください"
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <div className="draggable-area" ref={templateRef} >
            {image && <ImagePreviewer imageFile={image} onReset={resetPreview} imagePosition={imagePosition} inputRef={inputRef} onUpdatePosition={updateImagePosition} />}
            <AddTemplate areaSize={areaSize} onUpdateInputs={handleUpdateTemplate} templateData={template} onFieldContent={onFieldContent} onUpdatePosition={updateTemplatePosition} onUpdateSize={updateTemplateSize} />
            <AddField data={inputs} onRemoveItem={removeItem} onFieldContent={onFieldContent} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
          </div>
          <TagInput onTagStrChange={onTagStrChange} />
          <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIllustratedBook;
