import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { HowToUse } from './HowToUse';
import { Help } from '@mui/icons-material';

export const HowToUseModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <li className="row" onClick={handleOpenModal}>
        <div id='icon'><Help /></div>
        <div id='title'>使い方</div>
      </li>
      <ReactModal isOpen={modalIsOpen} onRequestClose={handleCloseModal} >
        <div className='modal'>
          <div class="modal-container">
            <h1>図鑑の作り方</h1>
            <HowToUse />
          </div>
          <button className="button" onClick={handleCloseModal}>Close</button>
        </div>
      </ReactModal>
    </>
  );
};
