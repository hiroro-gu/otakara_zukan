import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';
import { v4 as uuidv4 } from 'uuid';

function Templates({ onAddTemplate }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    client.get('/templates')
      .then((response) => {
        setTemplates(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleSelectTemplate = (selectTemplate) => {
    const templateId = selectTemplate.id
    client.get(`/templates/${templateId}`)
      .then((response) => {
        const templateFieldDesignObjects = response.data.included.filter(obj => obj.type === 'template_field_design');

        const fieldDesignsCount = response.data.data.relationships.fieldDesigns.data;
        const includedFieldDesigns = response.data.included.filter(obj => obj.type === 'field_design');
        const fieldDesignObjects = fieldDesignsCount.map((relationship, index) => {
          const fieldDesign = includedFieldDesigns.find(included => included.id === relationship.id);
          const positionAndSize = templateFieldDesignObjects[index];
          return {
            ...fieldDesign,
            uuid: uuidv4(),
            positionAndSize,
          };
        });
        onAddTemplate({
          id: templateId,
          fieldDesigns: fieldDesignObjects,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ul>
        {templates.map(template => (
          <li key={template.id} className='template-card' onClick={() => handleSelectTemplate(template)}>
            {template.attributes.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Templates;