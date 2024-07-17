import React, { useEffect, useState } from 'react'
import client from '../../lib/api/client';
import AdminSidebar from './sidebar/AdminSidebar'
import CreateField from './CreateField';

export const FieldManagement = () => {
  const [fields, setFields] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('');

  useEffect(() => {
    client.get('/field_designs')
    .then((response) => {
      setFields(response.data.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleDelete = (fieldDesignId) => {
    client.delete(`/field_designs/${fieldDesignId}`)
    .then(() =>{
      window.location.reload();
    })
    .catch (error => {
      console.error("削除中にエラーが発生しました: ", error);
    });
  }

  const FieldDesignList = fields.map((field) => (
    <tr key={field.id}>
      <td>{field.id}</td>
      <td>{field.attributes.label}</td>
      <td>{field.attributes.backgroundColor}</td>
      <td>{field.attributes.color}</td>
      <td>{field.attributes.borderColor}</td>
      <td>{field.attributes.borderStyle}</td>
      <td>{field.attributes.borderRadius}</td>
      <td>{field.attributes.fontFamily}</td>
      <td>{field.attributes.fontSize}</td>
      <button className="button" type="submit" onClick={() => handleDelete(field.id)}>
        Delete
      </button>
    </tr>
  ));

  const handleToggleComponent = () => {
    setSelectedComponent((prevComponent) =>
      prevComponent === 'CreateField' ? '' : 'CreateField'
    );
  };

  const currentComponent = selectedComponent === 'CreateField' ? <CreateField /> : null;

  return (
    <>
      <button
        className='screen-change'
        onClick={handleToggleComponent}
      >
        切り替え
      </button>
      {currentComponent}

      {!currentComponent && (
        <div className='container'>
        <AdminSidebar />  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Label</th>
              <th>BackgroundColor</th>
              <th>Color</th>
              <th>BorderColor</th>
              <th>BorderStyle</th>
              <th>BorderRadius</th>
              <th>FontFamiliy</th>
              <th>FontSize</th>
            </tr>
          </thead>
          <tbody>
            {FieldDesignList}
          </tbody>
        </table>
        </div>
      )}
    </>
  );
};