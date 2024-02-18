import React, { useEffect, useState } from 'react';
import Modal from './Modal'; 
import ReactPlayer from 'react-player';

const PreviewGrid = ({ mediaItems }) => {
  const [selectedMedia, setSelectedMedia] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedMedia(null);
    setIsModalOpen(false);
  };
  
  const handleShowMoreClick = () => {
    setIsMinimized(!isMinimized);
  
    // Scroll to the top of the grid after updating the isMinimized state
    const gridElement = document.querySelector('.preview-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);


  return (
    <div className="preview-grid">
    {
        Object.keys(mediaItems).map((band) => {
        const mediaArray = mediaItems[band].mediaItems;
        console.log("Grid: ", mediaArray)
        return (
          <React.Fragment key={band}>
            <h3 style={{'display': 'block'}}>{band}</h3>
            <div className={isMinimized ? 'content minimized' : 'content'}>
              {
                mediaArray.slice(0, isMinimized ? 4 : mediaArray.length).map((media, index) => (
                  <div key={index + "" + media.src} className="thumbnail" onClick={() => handleMediaClick(media)}>
                    {media.type === 'image' ? (
                      <img src={media.src} alt="Thumbnail" />
                    ) : (
                      <ReactPlayer className="react-player-preview" url={media.src} controls={false} light={true} />
                    )}
                  </div>
                ))
              }
              {mediaArray.length > 4 && (
                <button
                  className={`show-more-button ${isMinimized ? 'minimized' : ''}`}
                  onClick={handleShowMoreClick}
                >
                  {isMinimized ? 'Show More' : 'Show Less'}
                </button>
              )}
            </div>
          </React.Fragment>
        );
      })
    }
      

      {selectedMedia && (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
          {selectedMedia.type === 'image' ? (
            <img src={selectedMedia.src} alt="Full Size" />
          ) : (
            <ReactPlayer
              url={selectedMedia.src}
              controls={true}
              width="100%"
              height="75vh"
              playing={true}
          />
          )}
          <div className='modal-sidebar'>
            <div className="modal-sidebar-content">
              <p>submitted by:</p>
              <h2>{selectedMedia.submitter}</h2>
              <p>location:</p>
              <h2>{selectedMedia.country}</h2>
              <button className="modal-close-button" onClick={handleClose}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PreviewGrid;
