import React from 'react';

const Videoview = ({media, videoRef}) => {
    return (
      <div className="videowrap_div">
        <div className="video_div">
          <video className="img_100"
            src={`/upload/${media.medianame}`}
            type={media.mediatype} preload="auto" loop
            ref={videoRef}>
          </video>
        </div>
      </div>
    )
}

export default Videoview;
