import React, { useState, useRef } from 'react';
import AddField from '../AddField';
import client from '../../lib/api/client';
import AdminSidebar from './sidebar/AdminSidebar'
import { v4 as uuidv4 } from 'uuid';
import AddTemplate from '../AddTemplate';
import { useDraggableAreaSize } from '../customHooks/useDraggableAreaSize';

const CreateTemplate = () => {
  const [name, setName] = useState('');
  const [templateInputs, setTemplateInputs] = useState([]);
  const [template, setTemplate] = useState(null);
  const templateRef = useRef(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });

  const onAreaSize = (size) => {
    setAreaSize(size);
  }
  useDraggableAreaSize(templateRef, onAreaSize)

  const handleAddTemplate = (templateData) => {
    setTemplate(templateData)
  };

  const addInputToTemplate = (inputData) => {
    const uuid = inputData.uuid || uuidv4();
    setTemplateInputs((prevInputs) => [
      ...prevInputs,
      { ...inputData, x: 0, y: 0, width: null, height: null, uuid: uuid},
    ]);
  };

  const updateInputPosition = ( uuid, x, y) => {
    setTemplateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, x, y};
        }
        return input;
      });
    });
  };
    
  const updateInputSize = ( uuid, width, height) => {
    setTemplateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, width, height};
        }
        return input;
      });
    });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const templateParams = {
    template: {
      name: name,
      template_field_designs_attributes: templateInputs.map(input => ({
        field_design_id: input.id,
        x_position: input.x / areaSize.width,
        y_position: input.y / areaSize.height,
        width: input.width / areaSize.width,
        height: input.height / areaSize.height,
      }))
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await client.post('/templates', templateParams);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = (uuid) => {
    setTemplateInputs((prevTemplateInputs) => {
      const updateInputs = prevTemplateInputs.filter((input) => input.uuid !== uuid);
      return updateInputs;
    });
  };

  return (
    <div className='container'>
      <AdminSidebar onAddInput={addInputToTemplate} onAddTemplate={handleAddTemplate} />
      <div className='content'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type='text' placeholder="Template Name" onChange={(e) => handleName(e)} value={name} />
          <div className="draggable-area" ref={templateRef}>
            <AddTemplate areaSize={areaSize} templateData={template} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
            <AddField data={templateInputs} onRemoveItem={removeItem} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
            </div>
          <button className="button" type='submit'>Create Template</button>
          </form>
      </div>
    </div>
  );
};

export default CreateTemplate;