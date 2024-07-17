import React, { useState } from 'react';
import client from '../../lib/api/client';
import AdminSidebar from './sidebar/AdminSidebar'

const CreateField = () => {
  const [label, setLabel] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [color, setColor] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderStyle, setBorderStyle] = useState('');
  const [borderRadius, setBorderRadius] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleBorderColorChange = (e) => {
    setBorderColor(e.target.value);
  };
  const handleBorderStyleChange = (e) => {
    setBorderStyle(e.target.value);
  };
  const handleBorderRadiusChange = (e) => {
    setBorderRadius(e.target.value);
  };
  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const generateParams = {
    label: label,
    backgroundColor: backgroundColor,
    color: color,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    fontFamily: fontFamily,
    fontSize: fontSize,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      client.post('/field_designs', generateParams);
      setLabel("");
      setBackgroundColor("");
      setColor("");
      setBorderColor("");
      setBorderStyle("");
      setBorderRadius("");
      setFontFamily("");
      setFontSize("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <AdminSidebar />
      <h2>Field Design Management</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">label:</label>
        <select id="label" value={label} onChange={handleLabelChange}>
          <option value=""></option>
          <option value="学名">学名</option>
          <option value="和名">和名</option>
          <option value="生態">生態</option>
        </select>

        <label htmlFor="title">background_color:</label>
        <select id="backgroundColor" value={backgroundColor} onChange={handleBackgroundColorChange}>
          <option value=""></option>
          <option value="background_#FADCB2">赤</option>
          <option value="background_#B2E7F9">青</option>
          <option value="background_#DDF4BF">緑</option>
        </select>

        <label htmlFor="title">color:</label>
        <select id="color" value={color} onChange={handleColorChange}>
          <option value=""></option>
          <option value="#F55C20">赤</option>
          <option value="#338527">緑</option>
          <option value="#3349AF">青</option>
        </select>

        <label htmlFor="title">border_color:</label>
        <select id="borderColor" value={borderColor} onChange={handleBorderColorChange}>
          <option value=""></option>
          <option value="#FADCB2">赤</option>
          <option value="#B2E7F9">青</option>
          <option value="#DDF4BF">緑</option>
        </select>

        <label htmlFor="title">border_style:</label>
        <select id="borderStyle" value={borderStyle} onChange={handleBorderStyleChange}>
          <option value=""></option>
          <option value="solid">solid</option>
          <option value="groove">groove</option>
          <option value="dotted">dotted</option>
          <option value="dashed">dashed</option>
        </select>

        <label htmlFor="title">border_radius:</label>
        <select id="borderRadius" value={borderRadius} onChange={handleBorderRadiusChange}>
          <option value=""></option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <label htmlFor="title">font_family:</label>
        <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
          <option value=""></option>
          <option value="serif">serif</option>
          <option value="sansSerif">sansSerif</option>
          <option value="monospace">monospace</option>
        </select>

        <label htmlFor="title">font_size:</label>
        <select id="fontSize" value={fontSize} onChange={handleFontSizeChange}>
          <option value=""></option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="23">23</option>
        </select>

        <button className="button" type="submit">Create Field</button>
      </form>
    </div>
  );
};

export default CreateField;
