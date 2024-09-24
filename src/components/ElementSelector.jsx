// src/components/ElementSelector.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLayout, getCurrentPageId } from '../slices/formSlice';
import { Button, Box } from '@mui/material';

const ElementSelector = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentPageId = useSelector(getCurrentPageId);
  const handleElementSelect = (type) => {
    const newElement = {
      id: Date.now().toString() + 'question',
      type: type,
      columns: 1,
      properties: {
        label: "Type your question here",
        placeholder: "Type your placeholder here",
        isRequired: false,
        type: 'short-text'
      },
    };

    dispatch(addLayout({ pageId: currentPageId, element: newElement }));
    onClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        onClick={() => handleElementSelect('question')}
        fullWidth
      >
        Add Question
      </Button>
    </Box>
  );
};

export default ElementSelector;
