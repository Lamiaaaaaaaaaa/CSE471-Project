import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import './Chapters.css';

const Chapters = () => {
  const location = useLocation();
  const history = useHistory();
  const { storyData } = location.state || {}; // Fetch the passed story data

  const [chapters, setChapters] = useState('');
  const [styledTitle, setStyledTitle] = useState(storyData?.topicName || ''); // For styled title
  const [styledDescription, setStyledDescription] = useState(storyData?.description || ''); // For styled description

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chapterData = {
      ...storyData, 
      title: styledTitle, // Send the styled title
      description: styledDescription, // Send the styled description
      chapters
    };

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(chapterData)
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Story submitted successfully:', result);
        history.push('/home');
      } else {
        console.error('Error submitting story:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chapter-writing-container">
      <h1>Write Your Chapter</h1>
      <form onSubmit={handleSubmit} className="chapter-writing-form">
        <div className="form-group">
          <label htmlFor="styledTitle">Styled Story Title</label>
          <ReactQuill 
            id="styledTitle" 
            theme="snow" 
            value={styledTitle} 
            onChange={setStyledTitle} 
            placeholder="Enter the title with your own style" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="styledDescription">Styled Description</label>
          <ReactQuill 
            id="styledDescription" 
            theme="snow" 
            value={styledDescription} 
            onChange={setStyledDescription} 
            placeholder="Enter the description with your own style" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="chapters">Chapter Content</label>
          <textarea
            id="chapters"
            value={chapters}
            onChange={(e) => setChapters(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">Publish Story</button>
          <button type="button" className="cancel-btn" onClick={() => history.push('/writing')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chapters;
