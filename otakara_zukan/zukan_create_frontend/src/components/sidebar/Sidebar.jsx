import React from 'react'
import { SidebarData, SidebarFooterData } from './SidebarData';
import SidebarIcon from './SidebarIcon';
import { Link, useLocation } from 'react-router-dom';
import { HowToUseModal } from '../modal/HowToUseModal';

function Sidebar() {
  const location = useLocation();

  return (
    <div className='wrapper' >
      <div className='Sidebar'>
        <Link to="/" className='logo'>
          illustrated<br />
          book create
        </Link>
        <SidebarIcon />
        <ul className='SidebarList'>
          {SidebarData.map((value, key) => {
            return(
              <li
                key={key}
                id={window.location.pathname === value.link ? "active" : ""}
                className="row"
                onClick={() => {
                  window.location.pathname = value.link;
                }}
              >
                <div id="icon">{value.icon}</div>
                <div id="title">{value.title}</div>
              </li>
            );
          })}

          {location.pathname === '/new' && <HowToUseModal />}

          {SidebarFooterData.map((value, key) => {
            return(
              <li
                key={key}
                id={window.location.pathname === value.link ? "active" : ""}
                className="row footer"
                onClick={() => {
                  window.location.replace(value.link);
                }}
              >
                <div id="icon">{value.icon}</div>
                <div id="title">{value.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;