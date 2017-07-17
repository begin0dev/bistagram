import React from 'react';

const Videoview = ({media, videoRef}) => {
    return (
      <div className="videowrap_div">
        <div className="video_div">
          <video className="img_100"
            src={`/upload/${media.medianame}`}
            type={media.mediatype} loop playsInline
            ref={videoRef}>
          </video>
        </div>
      </div>
    )
}

export default Videoview;
