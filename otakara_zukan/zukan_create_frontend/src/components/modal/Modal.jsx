import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Fields from './Fields';
import Templates from './Templates';
import { TextReader } from './TextReader';

export const Modal = ({ onAddInput, onAddTemplate }) => {
  const [fieldModal, setFieldModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [textReaderModal, setTextReaderModal] = useState(false);

  const handleOpenFieldModal = () => {
    setFieldModal(true);
  }

  const handleCloseFieldModal = () => {
    setFieldModal(false);
  }

  const handleOpenTemplateModal = () => {
    setTemplateModal(true);
  }

  const handleCloseTemplateModal = () => {
    setTemplateModal(false);
  }

  const handleOpenTextReaderModal = () => {
    setTextReaderModal(true);
  }

  const handleCloseTextReaderModal = () => {
    setTextReaderModal(false);
  }



  return (
    <div className='modal-list'>
      <button type='button' className='button' onClick={handleOpenFieldModal} >
        入力フィールド追加
      </button>
      <ReactModal isOpen={fieldModal} contentLabel="Field Modal"  onRequestClose={handleCloseFieldModal} >
        <div className='modal'>
          <div class="modal-container">
            <Fields onAddInput={onAddInput}/>
          </div>
        </div>
      </ReactModal>

      <button type='button' className='button' onClick={handleOpenTemplateModal}>
        テンプレート変更
      </button>
      <ReactModal isOpen={templateModal} contentLabel="Template Modal" onRequestClose={handleCloseTemplateModal}>
        <div className='modal'>
          <div class="modal-container">
            <Templates onAddTemplate={onAddTemplate}/>
          </div>
        </div>
      </ReactModal>

      <button type='button' className='button' onClick={handleOpenTextReaderModal}>
        テキストリーダー
      </button>
      <ReactModal isOpen={textReaderModal} contentLabel="Template Modal" onRequestClose={handleCloseTextReaderModal}>
        <div className='modal'>
          <div class="modal-container">
            <TextReader/>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default Modal;