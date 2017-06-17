import React from 'react';

const Videoview = ({media}) => {
    return (
      <div className="videowrap_div">
        <div className="video_div">
          <video className="video" loop>
            <source src={`/upload/${media.medianame}`}/>
          </video>
        </div>
      </div>
    )
}

export default Videoview;
