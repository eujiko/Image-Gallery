import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { FaImages } from 'react-icons/fa'; // Gallery Icon import
import '../assets/Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const DEFAULT_QUERY = 'nature'; // Default keyword to load initially

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const query = searchQuery.trim() || DEFAULT_QUERY; // Use default if searchQuery is empty
        const response = await axios.get(
          `https://api.unsplash.com/search/photos/?client_id=1c7N6-0eTbYpO1u5GjEbHdqoOQwZzmUBp8yHhI8H_GE&per_page=30&page=1&query=${query}`
        );
        setPhotos(response.data.results);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [searchQuery]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = () => setSearchQuery(searchQuery.trim());

  const handleReset = () => setSearchQuery(''); // Reset query to default

  const handleImageClick = (imageUrl) => setModalImage(imageUrl);

  const closeModal = () => setModalImage(null);

  return (
    <div>
      <div className="navbar">
        <button onClick={handleReset} className="gallery-icon">
          <FaImages size={30} />
        </button> {/* Gallery Icon Button */}
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit} className="submit">Search</button>
      </div>

      {/* Engaging Section */}
      <div className="engaging-section">
        <h2>Explore the World through Pictures</h2>
        <p>
          Dive into our curated collection of breathtaking images. Whether you're seeking nature,
          adventure, or stunning architecture, we've got it all to inspire your imagination.
        </p>
      </div>

      <Masonry
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description || 'Unsplash Image'}
              onClick={() => handleImageClick(photo.urls.full)}
            />
          </div>
        ))}
      </Masonry>

      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Full view" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
