import React, { useEffect, useState } from 'react'
import useDraggable from './customHooks/useDraggable';
import useResizable from './customHooks/useResizable';

function AddTemplate({ onUpdateInputs, onFieldContent, areaSize, templateData, onUpdatePosition, onUpdateSize }) {
  useDraggable('.field-card', onUpdatePosition);
  useResizable('.field-card-text', onUpdateSize);
  const [inputs, setInputs] = useState([]);

  useEffect (() => {
    if (templateData) {
      const inputs = templateData.fieldDesigns;

      const positionSize = inputs.map(input => {
        return {
          ...input.attributes,
          uuid: input.uuid,
          xPosition: input.positionAndSize.attributes.xPosition,
          yPosition: input.positionAndSize.attributes.yPosition,
          width: input.positionAndSize.attributes.width,
          height: input.positionAndSize.attributes.height,  
        }
      })

      setInputs(positionSize)
    }
  }, [templateData]);

  const handleReset = (uuid) => {
    setInputs((prevInputs) => {
      const updateInputs = prevInputs.filter((input) => input.uuid !== uuid);
      return updateInputs;
    });

    const updateInputs = templateData.fieldDesigns.filter((input) => input.uuid !== uuid);
    const newTemplate = {id: templateData.id, fieldDesigns: updateInputs}
    onUpdateInputs(newTemplate)
  }

  return (
    <>
      {templateData && (
        <ul>
          {inputs.map(input =>(
              <li key={input.id} data-id={input.uuid} className='field-card' style={{ position: 'absolute', top: input.yPosition * areaSize.height, left: input.xPosition * areaSize.width }} >
                <label>{input.label}</label>
                <textarea
                  type="text"
                  className='field-card-text'
                  value={input.value}
                  onChange={(e) => onFieldContent(input.uuid, e.target.value)}  
                  style={{
                    backgroundColor: input.backgroundColor,
                    color: input.color,
                    borderColor: input.borderColor,
                    borderStyle: input.borderStyle,
                    borderRadius: parseInt(input.borderRadius, 10),
                    fontFamily: input.fontFamily,
                    fontSize: parseInt(input.fontSize, 10),
                    width: input.width * areaSize.width,
                    height: input.height * areaSize.height,
                  }}
                />
              <button type="button" onClick={() => handleReset(input.uuid)}>x</button>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default AddTemplate;