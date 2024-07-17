import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import client from '../lib/api/client';

export const TagInput = ({ onTagStrChange, existingTags }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (existingTags) {
      const formattedTags = existingTags.map(tag => ({ id: tag, text: tag }));
      setTags(formattedTags);
    }
  }, [existingTags]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await client.get('/tags');
        const formattedData = response.data.data.map(tag => ({
          id: tag.id,
          text: tag.attributes.name
        }));

        setSuggestions(formattedData);
      } catch (error) {
        console.error('Error fetching tags: ', error);
      }
    };
  
    fetchTags();
  }, []);

  const handleDelete = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    updateTagStr(newTags);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    updateTagStr([...tags, tag]);
  };

  const updateTagStr = (updatedTags) => {
    const deleteDoubleArray = [...new Set(updatedTags.map(tag => tag.text))];
    const tagStr = deleteDoubleArray.join(' ');
    onTagStrChange(tagStr);
  };

  return (
    <>
      <ReactTags
        placeholder="タグを入れてEnterを押してください"
        tags={tags}
        suggestions={suggestions}
        handleDelete={(i) => handleDelete(i)}
        handleAddition={(tag) => handleAddition(tag)}
      />
    </>
  );
};
