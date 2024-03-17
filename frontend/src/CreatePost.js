import React, { useState } from 'react';
import './Createpost.css';

const MacBookProPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pdate', date);
    formData.append('ptitle', title);
    formData.append('pdescription', description);
    formData.append('pimage', image);

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Post created successfully');
        // Optionally, you can redirect or perform any other action upon successful post creation
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <h3>Create Post</h3>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%' }}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: '100%' }}
        />
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          style={{ width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>POST</button>
      </form>
    </div>
  );
};

export default MacBookProPostForm;
