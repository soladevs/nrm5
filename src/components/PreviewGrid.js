import React, { useEffect, useState } from 'react';
import Modal from './Modal'; 
import ReactPlayer from 'react-player';

const PreviewGrid = ({ city, country, mediaItems, imagesLoaded }) => {
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

  useEffect(() => {
    if (imagesLoaded) {
      // Do something when images are loaded, if needed
    }
  }, [imagesLoaded]);

  return (
    <div className="preview-grid">
    { mediaItems &&
        Object.keys(mediaItems).map((band) => {
        const mediaArray = mediaItems[band].mediaItems;
        console.log("Grid: ", mediaArray)
        return (
          <div>
            <React.Fragment key={band}>
              <div>
              <h3 className="location-modal-band" style={{'display': 'block'}}>{band}</h3>
              <div className={isMinimized ? 'content minimized' : 'content'}>
                {
                  mediaArray.slice(0, isMinimized ? 4 : mediaArray.length).map((media, index) => (
                    <div key={index + "" + media.src} className="thumbnail" onClick={() => handleMediaClick(media)}>
                      {media.type === 'image' ? (
                        <img src={media.src} alt="Thumbnail" />
                      ) : (
                        <ReactPlayer className="react-player-preview" url={media.src} controls={true} light={true} />
                      )}
                    </div>
                  ))
                }
              </div>
              </div>
              {mediaArray.length > 4 && (
                  <button
                    className={`show-more-button ${isMinimized ? 'minimized' : ''}`}
                    onClick={handleShowMoreClick}
                  >
                    {isMinimized ? 'Show More' : 'Show Less'}
                  </button>
                )}
            </React.Fragment>
          </div>
        );
      })
    }
      

      {selectedMedia && (
        <div className='modal-content-wrapper'>
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
          <div></div>
          <div className='modal-sidebar'>
            <div className="modal-sidebar-content">
              <div>
                <p>submitted by:</p>
                <h2>{selectedMedia.submitter}</h2>
              <div>
                <p>location:</p>
                <h2>{city}, </h2>
                <h2>{country}</h2>
              </div>
              </div>
              <button className="modal-close-button" onClick={handleClose}>Close</button>
            </div>
          </div>
        </Modal>
        </div>
      )}
    </div>
  );
};

export default PreviewGrid;
