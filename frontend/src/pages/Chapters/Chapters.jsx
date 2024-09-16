import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './Chapters.css';
import axios from 'axios';

const Chapters = () => {
  const location = useLocation();
  const history = useHistory();
  const { storyData } = location.state || {};

  const [chapters, setChapters] = useState('');
  const [styledTitle, setStyledTitle] = useState(storyData?.topicName || '');
  const [styledDescription, setStyledDescription] = useState(storyData?.description || '');

  // Toolbar options for title and description
  const titleModules = { toolbar: [['bold', 'italic', 'underline', 'clean']] };
  const descriptionModules = { toolbar: [['bold', 'italic', 'underline', 'clean']] };

  const handleSaveOrPublish = async (status) => {
    const chapterData = {
      ...storyData,
      title: styledTitle,
      description: styledDescription,
      chapters,
      status,  // Either 'draft' or 'published'
    };

    try {
      const response = await axios.post('/api/stories', chapterData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status === 201) {
        if (status === 'published') {
          history.push('/home'); // Go to home after publishing
        } 
        if (status === 'draft') {
          alert('Draft saved successfully!');
          history.push('/profile'); // Go to profile for drafts
        }
      } else {
        console.error('Error submitting story:', response.data.error);
        setError('Error occurred while saving the story. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chapter-writing-container">
      <h1>Write Your Chapter</h1>
      <form className="chapter-writing-form">
        <div className="form-group">
          <label htmlFor="styledTitle">Title</label>
          <ReactQuill 
            id="styledTitle"
            theme="snow"
            value={styledTitle}
            onChange={setStyledTitle}
            modules={titleModules}
          />
        </div>

        <div className="form-group">
          <label htmlFor="styledDescription">Description</label>
          <ReactQuill 
            id="styledDescription"
            theme="snow"
            value={styledDescription}
            onChange={setStyledDescription}
            modules={descriptionModules}
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
          <button
            type="button"
            className="submit-btn"
            onClick={() => handleSaveOrPublish('draft')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={() => handleSaveOrPublish('published')}
          >
            Publish
          </button>
          <button type="button" className="cancel-btn" onClick={() => history.push('/writing')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chapters;
