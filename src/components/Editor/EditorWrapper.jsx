import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ImageCardEditor from './ImageCardEditor';

const EditorWrapper = () => {
  const [searchParams] = useSearchParams();
  const imageUrl = searchParams.get('imageUrl') || '';
  const text = searchParams.get('text') || '';

  return (
    <ImageCardEditor 
      imageUrl={imageUrl} 
      text={text} 
    />
  );
};

export default EditorWrapper; 