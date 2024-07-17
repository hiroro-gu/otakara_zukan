import React from 'react';
import SidebarIcon from '../../sidebar/SidebarIcon';
import Modal from '../../modal/Modal';

const AdminSidebar = ({ selectedComponent, onAddInput, onAddTemplate }) => {
  const isModalVisible = window.location.pathname === '/dashboard/templates' && selectedComponent !== '';

  const AdminSidebarData = [
    {
      title: "UserManagement",
      link: '/dashboard/users'
    },
    {
      title: "PostManagement",
      link: '/dashboard/posts'
    },
    {
      title: "TemplateManagement",
      link: '/dashboard/templates'
    },
    {
      title: "FieldManagements",
      link: '/dashboard/fields'
    },
    {
      title: "IconManagement",
      link: '/dashboard/icons'
    },
  ];

  return (
    <div className='wrapper'>
      <div className='Sidebar'>
        <SidebarIcon />
        <ul className='SidebarList'>
          {AdminSidebarData.map((value, key) => (
            <li
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              className="row"
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
              <div id="title">{value.title}</div>
            </li>
          ))}
          {isModalVisible && <Modal onAddInput={onAddInput} onAddTemplate={onAddTemplate} />}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;