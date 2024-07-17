import React from 'react'
import useDraggable from './customHooks/useDraggable';
import useResizable from './customHooks/useResizable';

const AddField = ({ data, onUpdatePosition, onUpdateSize, onFieldContent, onRemoveItem }) => {
  useDraggable('.field-card', onUpdatePosition );
  useResizable('.field-card-text', onUpdateSize);

  const handleReset = (uuid) => {
    onRemoveItem(uuid);
  };

  return (
    <>
      {data && data.length > 0 && (
        <ul>
          {data.map((fieldDesign, index) => (
            <li key={index} data-id={fieldDesign.uuid} className='field-card' style={{position: 'absolute', top: `${fieldDesign.y}px`, left:`${fieldDesign.x}px` }}>
              <label>{fieldDesign.attributes.label}</label>
              <textarea
                type="text"
                className='field-card-text'
                value={fieldDesign.value}
                onChange={(e) => onFieldContent(fieldDesign.uuid, e.target.value)}
                style={{
                  backgroundColor: fieldDesign.attributes.backgroundColor,
                  color: fieldDesign.attributes.color,
                  borderColor: fieldDesign.attributes.borderColor,
                  borderStyle: fieldDesign.attributes.borderStyle,
                  borderRadius: parseInt(fieldDesign.attributes.borderRadius, 10),
                  fontFamily: fieldDesign.attributes.fontFamily,
                  fontSize: parseInt(fieldDesign.attributes.fontSize, 10),
                  width: fieldDesign.width,
                  height: fieldDesign.height,
                }}
              />
              <button type="button" onClick={() => handleReset(fieldDesign.uuid)}>x</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AddField;
