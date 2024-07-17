import React, { useEffect, useState } from 'react'
import client from '../../lib/api/client';
import CreateTemplate from './CreateTemplate';
import AdminSidebar from './sidebar/AdminSidebar';

export const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('');

  useEffect(() => {
    client.get('/templates')
    .then((response) => {
      setTemplates(response.data.data)
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleDelete = (templateId) => {
    client.delete(`/templates/${templateId}`)
    .then(() =>{
      window.location.reload();
    })
    .catch (error => {
      console.error("削除中にエラーが発生しました: ", error);
    });
  }

  const TemplateList = templates.map((template) => (
    <tr key={template.id}>
      <td>{template.id}</td>
      <td>{template.attributes.name}</td>
      <button className="button" type="submit" onClick={() => handleDelete(template.id)}>
        Delete
      </button>
    </tr>
  ));

  const handleToggleComponent = () => {
    setSelectedComponent((prevComponent) =>
      prevComponent === 'CreateTemplate' ? '' : 'CreateTemplate'
    );
  };

  const currentComponent = selectedComponent === 'CreateTemplate' ? <CreateTemplate /> : null;

  return (
    <>
      {currentComponent && (
        <>
          {currentComponent}
        </>
      )}
      {!currentComponent && (
        <div className='container'>
          <AdminSidebar selectedComponent={selectedComponent} />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {TemplateList}
            </tbody>
          </table>
        </div>
      )}
      <button
        className='screen-change'
        onClick={handleToggleComponent}
      >
        切り替え
      </button>
    </>
  );
};