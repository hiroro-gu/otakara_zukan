import React, { useEffect, useState } from 'react'
import client from '../../lib/api/client';

function Fields({ onAddInput }) {
  const [fieldDesigns, setFieldDesigns] = useState([]);

  useEffect(() => {
    client.get('/field_designs')
      .then((response) => {
        setFieldDesigns(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  },[])

  const handleSelectInput = (inputData) => {
    onAddInput(inputData);
  };

  return (
    <>
      <ul>
        {fieldDesigns.map((fieldDesign, index) => (
          <li key={index} id={index} className='field-card' onClick={() => handleSelectInput(fieldDesign)}>
            <label>{fieldDesign.attributes.label}</label>
            <textarea
              type="text"
              placeholder='sample'
              readOnly
              style={{
                backgroundColor: fieldDesign.attributes.backgroundColor,
                color: fieldDesign.attributes.color,
                borderColor: fieldDesign.attributes.borderColor,
                borderStyle: fieldDesign.attributes.borderStyle,
                borderRadius: parseInt(fieldDesign.attributes.borderRadius, 10),
                fontFamily: fieldDesign.attributes.fontFamily,
                fontSize: parseInt(fieldDesign.attributes.fontSize, 10),
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Fields