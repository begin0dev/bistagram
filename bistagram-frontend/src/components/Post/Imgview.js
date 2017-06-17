import React from 'react';

const Imgview = ({media, handleImgLoad}) => {
    return (
      <div className="imgwrap_div">
        <img src={`/upload/${media.medianame}`} onLoad={handleImgLoad}
        className="postview_bodyimg" alt=""></img>
      </div>
    )
}

export default Imgview;
